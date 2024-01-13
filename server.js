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
app.use(methodOverride("_method"));
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
app.get("/todos/new", (req, res) => {
  res.render("new.ejs");
});

// Create
app.post("/todos", async (req, res) => {
  try {
    req.body.isComplete = req.body.isComplete === "on" ? true : false;
    await Todo.create(req.body);
    res.redirect("/todos");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Edit
app.get("/todos/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await Todo.findById(id);
    res.render("edit.ejs", { todos });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Update
app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    req.body.isComplete = req.body.isComplete === "on" ? true : false;
    await Todo.findByIdAndUpdate(id, req.body);
    res.redirect("/todos/");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Destroy
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Show
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await Todo.findById(id);
    res.render("show.ejs", { todos });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Organizing on port ${PORT}`);
});
