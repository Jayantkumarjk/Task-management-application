const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
})

module.exports = mongoose.model("Task",taskSchema);