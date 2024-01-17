// DEPENDENCIES
const mongoose = require("mongoose");

// DEFINE MODEL
const { Schema, model } = mongoose;

// SCHEMA
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// MODEL
const User = model("User", userSchema);

// EXPORT
module.exports = User;
