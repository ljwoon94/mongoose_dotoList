const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
// ejs는 자바스크립트가 내장되어 있는 html이다.
// ejs가 잇으면 서버(script)에서 보낸 변수를 가져와 사용가능
const ejs = require("ejs");
const path = require('path');
// 업로드될 파일을 저장할 폴더를 생성하기 위해 사용
const fs = require('fs');


// router
const todolistRouter = require('./routes/todolist/v1/todolist');
const {uploadRouter} = require('./routes/upload/v1/uploadRouter');

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

app.use('/', todolistRouter);
app.use('/upload', uploadRouter);


server.listen(port, (err) => {
    console.log(`Server listening on port ${port}`)
    //fs.existsSync()함수로 폴더가 존재하는지 확인하고, 없으면 fs.mkdirSync()함수로 폴더를 생성
    const dir = './uploadedFiles';
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
});
