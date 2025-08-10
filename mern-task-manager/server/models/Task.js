//task model with mongoose schema
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: 
  { type: String,
     required: true },
  user:
   { type: mongoose.Schema.Types.ObjectId,
     ref: "User" }
}, 
{ timestamps: true });
//exporting
module.exports = mongoose.model("Task", TaskSchema);
