var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    status: String
});

module.exports = mongoose.model("Task", TaskSchema);


