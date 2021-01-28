const { validationResult } = require("express-validator");
const User = require("../model/user");

exports.getUsers = (req, res, next) => {
    User.find()
        .then((result) => {
            res.status(200).json({ message: "Users fetched", data: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getSpecificUser = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            if (!result) {
                const error = new Error("Could not find user");
                error.status = 404;
                throw error;
            }
            res.status(200).json({ message: "User fetched", user: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createUser = (req, res, next) => {
    const { name, email, password, username, hobbies, bio } = req.body;
    const user = new User({
        name,
        email,
        password,
        username,
        hobbies,
        bio,
    });
    return user.save().then((result) => {
        return res
            .status(200)
            .json({ message: "New user created", user: user });
    });
};
