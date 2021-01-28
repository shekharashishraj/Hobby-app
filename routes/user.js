const express = require("express");
const Router = express.Router();

const userController = require("../controller/user");

Router.get("/get-users", userController.getUsers);
Router.get("/get-specific-user/:id", userController.getSpecificUser);
Router.post("/create-user", userController.createUser);

module.exports = Router;
