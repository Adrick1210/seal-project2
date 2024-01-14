// DEPENDENCIES
const express = require("express");
const middleware = require("./utils/middleware");

// APP OBJECT
const app = express();

// MIDDLE WARE
middleware(app);

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
