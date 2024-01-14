// DEPENDENCIES
const express = require("express");
const Todo = require("../models/todo");
const seedData = require("../models/seed");

// ROUTER
const router = express.Router();

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
      const todos = await Todo.find({});
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
      const todos = await Todo.findById(id);
      res.render("edit.ejs", { todos });
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
  router.delete("/todos/:id", async (req, res) => {
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