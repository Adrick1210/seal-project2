// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// ENV VARIABLES
const { DATABASE_URL, SECRET, PORT } = process.env;

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL);

mongoose.connection
  .on("error", (error) => {
    console.log(error);
  })
  .on("open", () => {
    console.log("connected to mongo");
  })
  .on("close", () => {
    console.log("Disconnected from mongo");
  });

// APP OBJECT
const app = express();

// MIDDLE WARE

// ROUTES
app.get("/", (req, res) => {
  res.send("It's Working");
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
