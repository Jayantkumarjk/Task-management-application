const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require("jsonwebtoken")

// hr.mxpertz@gmail.com
const securePassword = async (password)=>{
    try{
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    }catch(error){
        console.log(error.message);
    }
}
const create_token = async(id) => {
    try{
        const token = await jwt.sign({_id:id}, config.secret_jwt);
        return token;
    }catch(error){
        console.log(error.message);
    }
}



const insertUser = async(req,res)=>{
    try{
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            mobile: req.body.mobile,
            password:spassword 
        })
        const isUser = await User.findOne({email:req.body.email});
        if(isUser){
            res.status(400).send({message:"Email already exist"})
        }else{
            const userData = await user.save();
            res.status(200).send({message:userData})
        }
    }catch(error){
        console.log(error);
    }    
}

const loginVerification = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email:email});
        if(userData){
            const matchPassword = await bcrypt.compare(password,userData.password);
            if(matchPassword){
                /*
               const token = await create_token(userData._id)
               const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
               }
               res.cookie("token",token,options).send("login done")
               */
            
              res.status(200).send(userData) 
            }else{
                res.status(200).send({message:"Email or Password is not correct"})
            }

        }else{
            res.status(200).render({messge:"Email or Password is not correct"})
        }
    }catch(error){
        console.log(error.message)
    }
}




module.exports = {insertUser, loginVerification}