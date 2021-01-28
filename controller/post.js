const { validationResult } = require("express-validator");
const Post = require("../model/post");
const User = require("../model/user");

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((result) => {
            res.status(200).json({ message: "Posts fetched", data: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getSpecificPost = (req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
        .then((result) => {
            if (!result) {
                const error = new Error("Could not find post");
                error.status = 404;
                throw error;
            }
            res.status(200).json({ message: "Post fetched", student: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPostByHobbies = (req, res, next) => {
    const hobbies = req.body;
    let main_hobby_filters = Object.keys(hobbies).reduce((acc, el) => {
        if (productFilters[el] !== "") {
            acc[el] = productFilters[el];
        }
        return acc;
    }, {});
    Post.find(main_hobby_filters)
        .then((result) => {
            if (!result) {
                const error = new Error("Could not find hobby.");
                error.status = 404;
                throw error;
            }
            res.status(200).json({
                message: "Post Fetched with given filters!",
                product: result,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createPost = (req, res, next) => {
    const { userId } = req.body;
    try {
        if (!userId) {
            const error = new Error("Please enter user id");
            error.status = 404;
            throw error;
        } else {
            User.findById(userId)
                .then((result) => {
                    if (!result) {
                        const error = new Error(
                            "Could not find user with user Id"
                        );
                        error.status = 404;
                        throw error;
                    } else {
                        const { heading, description } = req.body;
                        console.log(heading);
                        if (heading === undefined) {
                            const error = new Error(
                                "Could not create post without heading"
                            );
                            error.status = 404;
                            throw error;
                        }
                        const post = new Post({
                            heading,
                            description,
                            user: userId,
                        });
                        return post.save();
                    }
                })
                .then((result) => {
                    res.status(200).json({
                        message: "Post created successfully",
                        result: result,
                    });
                });
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find post.");
                error.status = 404;
                throw error;
            }
            return Post.findByIdAndRemove(postId);
        })
        .then((result) => {
            res.status(200).json({ message: "Deleted post successfully!" });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.makePostArchieved = (req, res, next) => {
    const postId = req.params.id;
    const is_archieved = req.body.is_archieved;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find post.");
                error.status = 404;
                throw error;
            }
            post.is_archieved = is_archieved;
            return post.save();
        })
        .then((result) => {
            res.status(200).send({
                message: "Post updated successfully!",
                product: result,
            });
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};
