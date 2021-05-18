// 모듈을 추출합니다.
var path = require('path');

/* 설치한 express 모듈 불러오기 */
const express = require('express')

/* express 객체 생성 */
const app = express()

/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http')

/* express http 서버 생성 */
const server = http.createServer(app)


app.use(express.static(path.join(__dirname+'/public')));

// urlencoded를 사용하면 요청 본문 속성의 양식 데이터를 추출할 수 있다.
app.use (express.urlencoded ({extended : true}));

/* view 엔진 사용 */
app.set("view engine", "ejs");



/* --------- DB --------- */
const mongoose = require('mongoose');

// db에 연결
mongoose.set("useFindAndModify", false);

// 데이터베이스 연결 정보
const uri = 'mongodb://localhost:27017';


// 연결
mongoose.connect(uri, {useNewUrlParser : true}, () => {
  console.log('DB에 연결되었습니다.')
})

// models
const TodoTask = require('./public/Resource/index')

/* ---------------------- */




// GET 
app.get('/',(req, res) => {
  TodoTask.find({}, (err, tasks) => {

   
    
    res.render("index.ejs", {todoTasks : tasks})


  });

});





// POST
app.post('/', async (req, res)=> {
  console.log(req.body);


  // todotask 객체 생성
  const todoTask = new TodoTask({
    content : req.body.content
  });

  try{

    // 입력 값 저장
    await todoTask.save();

    res.redirect("/");

  }catch(err){

    console.error(err);

    res.redirect("/");

  }
 
});




// UPDATE
app
  .route("/edit/:id")

  .get((req, res) => {
    const id = req.params.id;

    TodoTask.find({}, (err, tasks) => {
      res.render("indexEdit.ejs", {todoTasks : tasks, idTask : id});
    });
  })

  .post((req, res) => {
    const id = req.params.id;

    TodoTask.findByIdAndUpdate( id, {content : req.body.content}, err => {
      if(err)
        return res.send(500, err);

        res.redirect("/");

    });
});



// REMOVE
app
.route("/remove/:id")

.get((req, res) => {
    const id = req.params.id;

    TodoTask.findByIdAndRemove( id, err => {
      if(err)
        return res.send(500, err)

      res.redirect("/");

      console.log(id)
    })
  })


/* 서버를 8000 포트로 listen */
server.listen(8000, function() {
    
    console.log('서버 실행 중..')
})