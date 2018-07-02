var express = require("express");
var router = express.Router();
var Task = require("../models/task");


// INDEX - show index page - soon to show all tasks
router.get('/', function (req, res) {
    Task.find({}, function(err, allTasks){
        if(err){
            console.log(err);
        }
    })
    res.render("tasks/index")
})

// NEW - show form to create new task
router.get('/new', function(req, res){
    res.render("tasks/new")
})


// CREATE - add a new task to DB
router.post('/', function(req, res){
    //collect input from body
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;

    var newTask = { title: title, description: description, status: status };

    //Create a new task and add to DB
    Task.create(newTask, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated)
            res.redirect('/');
        }
    });

});

// SHOW ROUTE - shows more info about one task
router.get('/:id', function(req, res){
    Task.findById(req.params.id, function(err, foundTask){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('tasks/show', {task: foundTask});
        }
    });
});

// EDIT ROUTE - show form to edit a task
router.get('/:id/edit', function(req, res){
    Task.findById(req.params.id, function(err, foundTask){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('tasks/edit', {task: foundTask});
        }
    });
});

// UPDATE ROUTE - handeling put request when updating a task
router.put('/:id', function(req, res){
    //collect input from body
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;

    var updatedTask = { title: title, description: description, status: status };

    Task.findByIdAndUpdate(req.params.id, updatedTask, function(err, updatedTask){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/tasks/' + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete('/:id', function(req, res){
    Task.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/tasks');
        } else {
            res.redirect('/tasks');
        }
    });
});




module.exports = router;