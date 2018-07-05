var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    db = require('./db');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));


// Require task-controller
var Task = require('./routes/TaskController');
// Link task-controller to /tasks
app.use('/tasks', Task);


//Require root-controller
var Root = require('./routes/RootController');
//Link root-controller to /
app.use('/', Root)

module.exports = app;