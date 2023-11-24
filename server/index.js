const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port || 5000;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/userdata")
  .then(() => {
    console.log(`Connected to Mongodb..`);
  })
  .catch((err) => {
    console.log(err);
  });

const user_route = require("./routes/userRoutes");
const task_route = require("./routes/taskRoute");
app.use("/api", user_route);
app.use("/api", task_route);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
