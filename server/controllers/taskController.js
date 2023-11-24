const Task = require("../models/taskModel");


const insertTask = async(req,res)=>{
    try{
        
        const task = new Task({
            title:req.body.title,
            user_id:req.body.user_id,
            description: req.body.description,
            date: req.body.date
        })
        const taskData = await task.save();
        res.status(200).send(taskData)
    }catch(error){
        console.log("error")
    }
}


//get all record
const all_task = async(req,res)=>{
    try{
        const records = await Task.find({user_id:req.params.id});
        res.status(200).send(records);
    }catch(error){
        res.status(400).send(error.message);
    }
}

// update data 
const update_Task = async(req,res)=>{
    try{
    console.log(req.params.id);
    console.log(req.body);
    const data = await Task.updateOne({_id:req.params.id},{$set: req.body})
    res.send("data updated")
    }catch(error){
        res.status(400).send(error.message);
    }   
}


// delete record
const delete_task = async(req,res)=>{
    const id = req.params.id;
    try{
        const deleteRecord = await Task.findByIdAndRemove(id);
        res.status(202).send(deleteRecord);
    }catch(error){
        console.log(error);  
        res.status(500).json({message : "something went wrong"}); 
    }
}




module.exports = {insertTask, all_task,update_Task, delete_task};