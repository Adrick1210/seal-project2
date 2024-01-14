// DEPENDENCIES
require("dotenv").config();
require("./config/db");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { PORT = 3025 } = process.env;
const todoRouter = require("./controllers/todo");
const userRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// APP OBJECT
const app = express();

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);
app.use("/todos", todoRouter);
app.use("/user", userRouter);

// ROUTES
// Test
app.get("/", (req, res) => {
  res.send("It's Working");
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Organizing on port ${PORT}`);
});
