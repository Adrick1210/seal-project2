// DEPENDENCIES
const express = require("express");
const middleware = require("./utils/middleware");
const routers = require("./utils/routers");

// APP OBJECT
const app = express();

// MIDDLE WARE
middleware(app);
routers(app);

// ROUTES
// Test
app.get("/", (req, res) => {
  res.send("It's Working");
});

// LISTENER
const PORT = process.env.PORT || 3025
app.listen(PORT, () => {
  console.log(`Organizing on port ${PORT}`);
});