const {Router} = require('express');;
const uploadRouter = Router();
const multer = require('multer');


// 업로드한 파일의 이름을 유지하기 위해서는 multer에 storage 세팅을 해야함
// 이때 사용될 변수
let storage  = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploadedFiles/');
    },
    // 서버파일명과 업로드파일명이 동일하면 문제가 있을 수 있어 시간을 넣음.
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
});

// multer로 파일이 저장될 위치만을 설정(dest: 'uploadedFiles)
// 위치만 세팅하면 파일명이 랜덤으로 결정됨
// let upload = multer({ dest: 'uploadedFiles/' });

// 이 방식은 위의 storage 변수를 가져와 이름과 경로를 만들어둔다.
let uploadWithOriginalFilename = multer({ storage: storage });


uploadRouter.post('/api/post',uploadWithOriginalFilename.array('file_upload'),(req, res)=>{
    console.log(req.body);
    return res.render('success',{ file:null, files:req.files })
    //return res.redirect('/');
    //return res.render('index',{ file:null, files:req.files });

});


module.exports = {uploadRouter};