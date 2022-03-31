const userService = require("../service/user.service.js");

var userController= require("express").Router();

// Create a new User
userController.post("/", userService.create);

// Retrieve all users
userController.get("/", userService.findAll);

// Retrieve a single User by id
userController.get("/:id", userService.findOne);

// Update a User with id
userController.put("/:id", userService.update);

// Delete a User by id
userController.delete("/:id", userService.delete);

module.exports = userController;