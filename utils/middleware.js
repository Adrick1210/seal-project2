// DEPENDENCIES
require("dotenv").config();
require("../config/db");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// MIDDLE WARE FUNCTION
function middleware(app) {
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
}

// EXPORTS
module.exports = middleware;