const mongoose = require("mongoose")
const Schema = mongoose.Schema;

exports.User = mongoose.model("User", new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}))