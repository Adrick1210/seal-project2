// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const todoRouter = require("./controllers/todo");
const User = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));
app.use("/todos", todoRouter);
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

// ROUTES
// Test
app.get("/", (req, res) => {
  res.send("It's Working");
});

// USER ROUTES
// Sign Up page
app.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

// Sign up Submit
app.post("/user/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    // logger for password
    console.log("Hashed Password:", req.body.password);
    await User.create(req.body);
    res.redirect("/login");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Login Page
app.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

// Login Submit
app.post("/user/login", async (req, res) => {
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
app.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Organizing on port ${PORT}`);
});
