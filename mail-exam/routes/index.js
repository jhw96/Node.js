var express = require('express');
const nodemailer = require('nodemailer'); // 메일 전송 모듈
var router = express.Router();

//단 Gmail 이용시 구글계정 보안 수준이 낮은 앱의 액세스 허용을 해줘야함
router.post("/nodemailerTest", function(req, res, next){
  let email = req.body.email;

  //createTransport 메서드를 통해 메일 발송 객체 생성
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '***@gmail.com',  // 서비스 이용할 Gmail 계정 아이디
      pass: 'password'          // 계정의 비밀번호
    }
  });
  // 메일 내용에 대한 옵션 정의
  let mailOptions = {
    from: '***@gmail.com',    // 발송 메일 주소
    to: '***@naver.com' ,      // 수신 메일 주소
    subject: 'Mail Test(Node.js)',   // 제목
    text: 'Mail Test using Node.js'  // 내용
  };

  // 첫번째 매개변수는 객체로 전달이 좋음, 메일전송기능
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect("/");
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;