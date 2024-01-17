// DEPENDENCIES
const todoController = require("../controllers/todo");
const userController = require("../controllers/user");

// FUNCTION
function routers(app) {
    app.use("/todos", todoController);
    app.use("/user", userController);
}

// EXPORTS
module.exports = routers;