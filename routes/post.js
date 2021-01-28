const express = require("express");
const Router = express.Router();

const postController = require("../controller/post");

Router.get("/get-posts", postController.getPosts);
Router.get("/get-specific-post/:id", postController.getSpecificPost);
Router.post("/get-post-by-hobbies", postController.getPostByHobbies);
Router.delete("/delete-post", postController.deletePost);
Router.put("/change-post-archieve", postController.makePostArchieved);
Router.post("/create-post", postController.createPost);

module.exports = Router;
