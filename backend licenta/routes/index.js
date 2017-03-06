var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
var path=require('path');
var fs=require("fs");
var modelsPath = path.join(__dirname, '../db');
fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + '/' + file);
});
var User=mongoose.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
  var user=new User();
  user.name="test";
  user.lastname="test1";
  user.email="a@a.com";
  user.password="aaa";
  user.age=2;
  user.save(function(err){
    if(err) console.log(err)
      else
        console.log("saved succesfully");
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
