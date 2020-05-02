var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 게시판 get 처리, findAll() 메서드를 통해 모든 post 데이터 조회, findOne() 메서드 호출하여 한개의 post를 조회하는데 이 때 매개변수 프로퍼티로 include를 작성하면 관계가 설정되어 있으면서 어떤 조건을 만족하는 모델 객체를 불러올 수 있음
router.get('/board', async function(req, res, next) {
  let result = await models.post.findAll();
  if (result){
    for(let post of result){
      let result2 = await models.post.findOne({
        include: {
          model: models.reply,
          where: {
            postId: post.id
          }
        }
      })
      if(result2){
        post.replies = result2.replies
      }
    } 
  }
  res.render("show", {
    posts : result
  });
});


// 게시판 post 처리(요청 시)
router.post('/board', function(req, res, next) {
  let body = req.body;
// create() 메서드를 실행하면 내부적으로 insert 쿼리 실행
  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  })
  .then( result => {
    console.log("데이터 추가 완료");
    res.redirect("/board");
  })
  .catch( err => {
    console.log("데이터 추가 실패");
  })
});

// 게시판 수정하기 버튼 클릭 요청시
router.get('/board/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.findOne({
    where: {id: postID}
  })
  .then( result => {
    res.render("edit", {
      post: result
    });
  })
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});

// edit.ejs 창에서 수정완료후 전송하면 처리, 원래 put처리해야하는데 내가 post해도 됨
router.post('/board/:id', function(req, res, next) {
  let  postID = req.params.id;
  let body = req.body;

  models.post.update({
    title: body.editTitle,
    writer: body.editWriter
  },{
    where: {id: postID}
  })
  .then( result => {
    console.log("데이터 수정 완료");
    res.redirect("/board");
  })
  .catch( err => {
    console.log("데이터 수정 실패");
  });
});

// 게시물 삭제 원래 delete로 해야하는데 내가 post로 했는데 됨
router.post('/delete/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.destroy({
    where: {id: postID}
  })
  .then( result => {
    console.log("데이터 삭제 완료");
    res.redirect("/board")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

// 댓글 등록
router.post("/reply/:postID", function(req, res, next){
  let postID = req.params.postID;
  let body = req.body;

  models.reply.create({
    postId: postID,
    writer: body.replyWriter,
    content: body.replyContent
  })
  .then( results => {
    res.redirect("/board");
  })
  .catch( err => {
    console.log(err);
  });
});

module.exports = router;
