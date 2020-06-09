var express = require('express');
var request = require('request'); // 웹 페이지의 HMTL 문서 가져오는 모듈
var cheerio = require('cheerio'); // HTML 문서 파싱해주는 모듈
const Iconv = require('iconv').Iconv; // 문자열의 인코딩을 변환해주는 모듈
var router = express.Router();

const iconv = new Iconv('CP949', 'utf-8//translit//ignore');

router.get("/crawlingTest", function(req, res, next){
  let url = "http://movie.naver.com/movie/sdb/rank/rmovie.nhn";
// 첫번째 매개변수로 url 경로
  request({url, encoding: null},function(error, response, body){
    let htmlDoc = iconv.convert(body).toString(); //인코딩을 변환하는 메서드
    let result = [];
    
    const $ = cheerio.load(htmlDoc); // jQuery 기호 $변수
    let colArr = $(".tit3") // jQuery 셀렉터 이용
    for(let i = 0; i < colArr.length; i++){
        result.push(colArr[i].children[1].attribs.title)
    }
    
    res.json(result)
  });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
