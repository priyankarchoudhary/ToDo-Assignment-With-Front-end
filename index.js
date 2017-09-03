var express = require("express");
var todo_db = require("./seed.js");
var bodyparser = require("body-parser")
var morgan = require("morgan")



//console.log(todo_db);
var app = express();
app.use(morgan('dev'));
/*add todo, delete todo, get all todo , complete todo(modifying)*/
app.use("/",bodyparser.urlencoded({extended:false}))
// HomeWork : RESTful APIs
//get all todo
//http://localhost:4000/todos/GET
// api part of server
app.get("/api/todos",function (req,res) {
    res.json(todo_db.todos);

})

app.delete("/api/todos/:id",function (req,res) {
    var del_id = req.params.id;
    //check if id exist or not
    var todo = todo_db.todos[del_id];
    if (!todo){
        res.status(400).json({error: "todo doesnot exist"});
    }
    else{
        todo.status = todo_db.StatusENUMS.DELETED;
        res.json(todo_db.todos);
    }
})

app.post("/api/todos",function (req,res) {
    var todo = req.body.todo_title;
    console.log(todo)

        if(todo==""|| todo.trim()=="")
        {
            res.send(400).json({error: "todo title can not be empty"});
        }
        else{
            var new_todo_object = {
                title : req.body.todo_title,
                status : todo_db.StatusENUMS.ACTIVE
            }
            todo_db.todos[todo_db.next_todo_id] = new_todo_object;
            todo_db.next_todo_id = todo_db.next_todo_id + 1 ;
            res.json(todo_db.todos);
        }

})

app.put("/api/todos/:id",function (req,res) {
    var mod_id = req.params.id;
    //check if id exist or not
    var todo = todo_db.todos[mod_id];
    if (!todo){
        res.status(400).json({error: "cant modify todo that doesnot exist"});
    }
    else{
        var todo_title =req.body.title;
        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title = todo_title;
        }
//---
        var todo_status =req.body.todo_status;
        if(todo_status && todo_status==todo_db.StatusENUMS.ACTIVE ||todo_status==todo_db.StatusENUMS.COMPLETE){
            todo.status = todo_status;
        }
        //---
        //todo.status = todo_db.StatusENUMS.DELETED;
        res.json(todo_db.todos);
    }
})

//serve static assets in public directory
app.use("/",express.static(__dirname+"/public"));
app.use(morgan('dev'));
app.listen(4000,"127.0.0.1");
