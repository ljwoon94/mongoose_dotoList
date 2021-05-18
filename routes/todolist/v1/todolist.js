const express = require('express');
const router = express.Router();
const ToDoModel = require("../../../models/todolist");

router.get("/", (req, res) => {
    ToDoModel.find({}, (err, todos) => {
        res.render("index", {todos : todos});
    });
});

// Access the parse results as request.body
router.post('/api/todolist', (req, res) => {
    console.log(req.body.content);
    const addToDoList = new ToDoModel({content : req.body.content});
    //res.status(302).redirect('/');
    addToDoList.save((err)=>{
        if(err) throw err
            res.redirect('/');
        })
    
});

router.post('/api/update/:id',(req,res) =>{
    const id = req.params.id;
    console.log(req.body);
    ToDoModel.findByIdAndUpdate( id, {content : req.body.content}, err => {
        if(err) return res.send(500, err);
            res.redirect('/');
    });
});

router.post('/api/remove/:id',(req,res) =>{
    const id = req.params.id;
    console.log(req.body);
    ToDoModel.findByIdAndRemove( id, err => {
        if(err) return res.send(500, err);
            res.redirect('/');
        
    });
});

module.exports = router;