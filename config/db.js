// DEPENDENCIES
const mongoose = require("mongoose");

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

// EXPORTS
module.exports = mongoose;