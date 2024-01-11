// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const seedData = require("./models/seed");

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
app.use(morgan("dev"));
app.use(methodOverride("method-override"));
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// ROUTES
// Test
app.get("/", (req, res) => {
  res.send("It's Working");
});

// Seed
app.get("/todos/seed", async (req, res) => {
  try {
    await Todo.deleteMany({});
    const todos = await Todo.create(seedData);
    res.json(todos);
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Index
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.render("index.ejs", { todos });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// New

// Create

// Edit

// Update

// Destroy

// Show

// LISTENER
app.listen(PORT, () => {
  console.log(`Organizing on port ${PORT}`);
});
