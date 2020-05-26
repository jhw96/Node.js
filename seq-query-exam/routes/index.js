var express = require('express');
var models = require("../models");
var sequelize = require("sequelize");
var Op = sequelize.Op;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 유사검색
router.get("/likeSearch/:searchWord",function(req,res,next){
    let searchWord = req.params.searchWord
    // findAll 메서드를 사용해 모든 데이터 조회
    models.test.findAll({
        where:{
            postName: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    })
        .then( result => {
        res.json(result)
    })
        .catch( err => {
        console.log(err)
    })
})


// OR 검색
router.get("/orSearch/:searchWord", function(req, res, next){
    let searchWord = req.params.searchWord

    models.test.findAll({
        where:{
            //or 속성은 각 원소를 탐색하여 그 조건을 만족하면 그 row를 반환
            [Op.or]: [
                {
                    postName: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                },
                {
                    postWriter: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                }
            ]
        }
    })
        .then( result => {
            res.json(result)
        })
        .catch( err => {
            console.log(err)
        })
})

module.exports = router;