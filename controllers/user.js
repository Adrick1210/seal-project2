// DEPENDENCIES
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// ROUTER
const router = express.Router(); 

// ROUTES

// Sign Up page
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
  });
  
  // Sign up Submit
  router.post("/signup", async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );
      // logger for password
      console.log("Hashed Password:", req.body.password);
      await User.create(req.body);
      const { username } = req.body;
      await User.findOne({ username });
      req.session.username = username;
      req.session.loggedIn = true;
      res.redirect("/todos");
    } catch (error) {
      console.log("-----", error.message, "-----");
      res.status(400).send("error, read logs for error details");
    }
  });
  
  // Login Page
  router.get("/login", (req, res) => {
    res.render("user/login.ejs");
  });
  
  // Login Submit
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User Does Not Exist");
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error("Password Does Not Match");
      }
      req.session.username = username;
      req.session.loggedIn = true;
      res.redirect("/todos");
    } catch (error) {
      console.log("-----", error.message, "-----");
      res.status(400).send("error, read logs for error details");
    }
  });
  
  // Logout
  router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
      res.redirect("/user/login");
    });
  });

// EXPORTS
module.exports = router;