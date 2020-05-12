const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3'); 
// AWS S3에 업로드할 수 있도록 도와주는 multer-s3
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jhwtest",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
})
// bucket : s3 버킷이름, key : s3에 저장될 파일의 이름, acl : 파일에 대한 접근 권한

router.post('/upload', upload.single("imgFile"), function(req, res, next){
  let imgFile = req.file;
  res.json(imgFile);
})

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

module.exports = router;