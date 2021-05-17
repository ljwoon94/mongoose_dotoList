const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
// ejs는 자바스크립트가 내장되어 있는 html이다.
// ejs가 잇으면 서버(script)에서 보낸 변수를 가져와 사용가능
const ejs = require("ejs");
const path = require('path');

const ToDoModel = require("./models/todolist");

// mongoDB 주소
const db_url = 'mongodb+srv://admin:roottoor@mongodbtutorial.fvm0n.mongodb.net/todoList?retryWrites=true&w=majority';
const port = 3000;


app.use(express.static(path.join(__dirname + '/public')));

// Parse JSON bodies (as sent by API clients)
// html 폼에서 post로 전송한 클라이언트 데이터는
// req.body를 이용해 받는다.
// 데이터를 파싱하기 위해 express.json(), express.urlencoded 사용
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// CONNECT TO MONGODB SERVER
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


app.get("/", (req, res) => {
    ToDoModel.find({}, (err, todos) => {
        res.render("index", {todos : todos});
    });
});

// Access the parse results as request.body
app.post('/api/todolist', (req, res) => {
    console.log(req.body.content);
    const addToDoList = new ToDoModel({content : req.body.content});
    //res.status(302).redirect('/');
    addToDoList.save((err)=>{
        if(err) throw err
            res.redirect('/');
        })
    
});

app.post('/api/update/:id',(req,res) =>{
    const id = req.params.id;
    console.log(req.body);
    ToDoModel.findByIdAndUpdate( id, {content : req.body.content}, err => {
        if(err) return res.send(500, err);
            res.redirect('/');
    });
});

app.post('/api/remove/:id',(req,res) =>{
    const id = req.params.id;
    console.log(req.body);
    ToDoModel.findByIdAndRemove( id, err => {
        if(err) return res.send(500, err);
            res.redirect('/');
        
    });
});

server.listen(port, (err) => {
    console.log(`Server listening on port ${port}`)
});
