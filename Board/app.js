const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');

const app = express();

var indexRouter = require('./routes/index');

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/'));

app.use('/',indexRouter);


app.listen(3000,function(){
    console.log("Server is running at 3000");
});


module.exports = app;
