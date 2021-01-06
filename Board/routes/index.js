var express = require('express');
var router = express.Router();

const mysql = require("mysql");

let client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gusdnd02",
  database: "mysqltest"
})

router.get(['/main','/main/:id'], function(req, res, next){
    client.query('SELECT * FROM boardlist', function(err, result, fields){
      var id = req.params.id;
      if(id){
        var sql = 'SELECT * FROM boardlist WHERE id=?';
        client.query(sql, [id], function(err, iresult, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('main', {results : result, iresults : iresult[0] });
            console.log(iresult);
          }
        });
      } else {
        res.render('main', {results : result, iresults : undefined })
        console.log(result);
      }
    });
});

router.get('/main/:id/delete', function(req, res, next){
  var id = req.params.id;
  client.query('SELECT * FROM boardlist',function(err,result,fields){
    var sql = 'SELECT * FROM boardlist WHERE id = ?';
    client.query(sql, [id], function(err,iresult,fields){
      if(err) {
        console.log('Query Error');
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      else{
        if(iresult.length == 0){
          console.log('Nothing Selected!');
          res.status(500).send('Internal Sever Error');
        }
        else{
          res.render('delete',{ results : result, iresults : iresult[0] });
        }
      }
    })
  });
})

router.post('/main/:id/delete', function(req,res,next){
  var id = req.params.id;
  client.query('DELETE FROM boardlist WHERE id = ?', [id], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      else {
        console.log(id + ' th ' + result + ' Delete');
        res.redirect('/main');
      }
  })
})

router.get('/main/:id/edit', function(req,res,next){
    client.query('SELECT * FROM boardlist', function(err, result, fiedls){
      var id = req.params.id;
      client.query('SELECT * FROM boardlist WHERE id = ?', [id], function(err, iresult, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            console.log(iresult);
            res.render('edit', { results : result, iresults : iresult[0] });
          }
      })
    })
})

router.post('/main/:id/edit', function(req, res, next){
     var sql = 'UPDATE boardlist SET name=?, title=?, content=? WHERE id=?';
     var title = req.body.title;
     var content = req.body.content;
     var name = req.body.name;
     var id = req.params.id;
     client.query(sql, [name, title, content, id], function(err, iresult, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        else {
          console.log(iresult);
          res.redirect('/main/' +id);
        }
     })
})


router.get('/list/:id', function(req, res, next){
  var id = req.params.id;
  var sql = "SELECT * FROM boardlist WHERE id=?";
  client.query(sql, [id], function(err,result,fields){
      if(err){
        console.log(err);
        res.sendStatus(500).send('Iternal Serval Error');
      }
      else{
        console.log(sql);
        console.log(result);
        res.render('content', {
          results: result
        })
        console.log(result[0].title + " : " + result[0].content);
      }
  })
});


router.get('/list',function(req,res,next){
    client.query("SELECT * FROM boardlist;", function(err,result,fields){
        if(err){
          console.log("Query Error!");
        }
        else{
          res.render('list',{
              results : result
          });
          console.log("List Page Success!");
        }
    });
});



router.get('/write',function(req,res,next){
    res.render('write');
    console.log('Write Page Success!');
})

router.post('/write',function(req,res,next){
    var body = req.body;
    console.log(body);
    client.query("INSERT INTO boardlist(name,title,content) VALUES(?,?,?)",[body.name, body.title, body.content],function(err,result,fields){
      if(err){
        console.log("Insert Query Error!");
      }
      else{
        res.redirect('/main');
      }
    });
});

router.get('/',function(req,res,next){
    res.render('get_page',{ title : '현웅 First Homepage'});
    //res.send(req.param("test"));
    console.log("Get Page Success");
});



router.get('/error',function(req,res,next){
  res.sendStatus(404);
  console.log("Error Test");
})


module.exports = router;
