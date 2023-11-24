const express = require("express");
const bodyParser = require("body-parser");
const { insertUser, loginVerification } = require("../controllers/userController");
const user_route = express();
const cors = require('cors')


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
user_route.use(cors());

user_route.post("/register",insertUser)
user_route.post("/login",loginVerification)



module.exports = user_route;