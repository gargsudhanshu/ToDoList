//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

//to run the function date, add the paranthesis
// console.log(date());

const app = express();

//its possible to push elements in const array but not possible to assign to brand new array
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    
    const day = date.getDate();
    res.render("list",{listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    const item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});


/*
Javascript variable var let const
if its inside function then its local variable
if its outside function then its global variable

Now {} - if, for, while (other than function)
    var - global variable
    let - local variable
    const - local variable
*/