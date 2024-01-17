// DEPENDENCIES
const mongoose = require("mongoose");

// DEFINE MODEL
const { Schema, model } = mongoose;

// SCHEMA
const todoSchema = new Schema({
  title: String,
  description: String,
  isComplete: Boolean,
  username: String,
});

// MODEL
const Todo = model("Todo", todoSchema);

// EXPORT
module.exports = Todo;
