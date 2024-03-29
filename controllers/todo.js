// DEPENDENCIES
const express = require("express");
const Todo = require("../models/todo");
const seedData = require("../models/seed");

// ROUTER
const router = express.Router();

// ROUTER MIDDLE WARE
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/signup");
  }
});

// ROUTES

// Seed
router.get("/seed", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ username: req.session.username });
    res.render("index.ejs", { todos });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// New
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Create
router.post("/", async (req, res) => {
  try {
    req.body.isComplete = req.body.isComplete === "on" ? true : false;
    req.body.username = req.session.username;
    await Todo.create(req.body);
    res.redirect("/todos");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.render("edit.ejs", { todo });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Update
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await Todo.findById(id);
    res.render("show.ejs", { todos });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// EXPORTS
module.exports = router;
