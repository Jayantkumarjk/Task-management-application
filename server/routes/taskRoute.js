const express = require("express");
const bodyParser = require("body-parser");
const { insertTask, all_task, update_Task, delete_task } = require("../controllers/taskController");
const task_route = express();
const cors = require('cors')
const auth = require("../middleware/auth");




task_route.use(bodyParser.json());
task_route.use(bodyParser.urlencoded({extended:true}));
task_route.use(cors())


task_route.post("/addtask",insertTask);
task_route.get("/alltask/:id",all_task);
task_route.put("/updatetask/:id",update_Task);
task_route.delete("/deletetask/:id",delete_task);





module.exports = task_route;