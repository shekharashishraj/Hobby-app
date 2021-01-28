const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        username: {
            type: String,
            required: [true, "Username must be provided"],
        },
        hobbies: {
            type: Array,
            required: [true, "User must have atleast one hobby"],
        },
        bio: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
