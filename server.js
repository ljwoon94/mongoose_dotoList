const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const path = require('path');

// mongoDB 주소
const db_url = 'mongodb+srv://admin:roottoor@mongodbtutorial.fvm0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = 3000;



// const serverStart = async() =>{
//     try {
//         let mongodbConnetection = await mongoose.connect(db_url,  {useNewUrlParser: true, useUnifiedTopology: true});
//         console.log({mongodbConnetection});

//         // public 경로 정적 처리 가능
//         app.use(express.static(path.join(__dirname + '/public')));
    
//         // Parse JSON bodies (as sent by API clients)
//         // html 폼에서 post로 전송한 클라이언트 데이터는
//         // req.body를 이용해 받는다.
//         // 데이터를 파싱하기 위해 express.json(), express.urlencoded 사용
//         app.use(express.json());
//         app.use(express.urlencoded({ extended : true }));

//         // Access the parse results as request.body
//         app.post('/', (req, res) => {
//             console.log(req.body.text);
//             res.status(302).redirect('/');
//         });

//         server.listen(port, (err)=>{
//             console.log(`server is running ${port}`);
//         });
//     } catch (error) {
//         console.log('error');
//     }
// } 
// serverStart();

// public 경로 정적 처리 가능
app.use(express.static(path.join(__dirname + '/public')));
// Parse JSON bodies (as sent by API clients)
// html 폼에서 post로 전송한 클라이언트 데이터는
// req.body를 이용해 받는다.
// 데이터를 파싱하기 위해 express.json(), express.urlencoded 사용
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONNECT TO MONGODB SERVER
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// Access the parse results as request.body
app.post('/', (req, res) => {
    console.log(req.body.text);
    res.status(302).redirect('/');
});
server.listen(port, (error) => 
    console.log(`Server listening on port ${port}`)
);
