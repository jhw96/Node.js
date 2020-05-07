const express = require('express');
const router = express.Router();
const multer = require("multer");

// 실제 로컬의 디스크에 파일을 저장하는 diskStorage
let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/") //파일이 저장될 경로 (upload/ 가상경로)
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + " - " + Date.now())
    }
})

// multer 미들웨어 등록
let upload = multer({
    storage: storage
})

// 업로드 페이지 처리
router.get('/show',function(req,res,next){
    res.render("board");
})

// 파일 업로드 요청 처리
router.post('/create',upload.single("imgFile"),function(req,res,next){
    let file = req.file
    
    let result = {
        originalName: file.originalname,
        size: file.size,
    }
    
    res.json(result);
});

module.exports = router;