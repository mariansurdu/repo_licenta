var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path=require('path');
var fs=require("fs");
var crypto = require('crypto');
var modelsPath = path.join(__dirname, '../models');
fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + '/' + file);
});
var algorithm = 'aes-256-ctr';
var  password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var User=mongoose.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/create",function(req,res){
  var user=new User();
  var data=req.body;
  user.name=data.name;
  user.lastname=data.lastname;
  user.email=data.email;
  user.password=encrypt(data.password);
  user.age=data.age;
  user.personType=data.personType;

  user.save(function(err){
    if (err) console.log(err);
    else
      res.send(200);
  })
})



router.post("/login",function(req,res){
    console.log(req.body);
User.find({email:req.body.email},function(err,data){
    console.log(data);
    if (data.length==0) {

      res.send(401)
    }
  else {
      if (req.body.password===decrypt(data[0].password)) {
        res.send(200,{"email":req.body.email});
      }
      else {
        res.send(401);
      }
    }

})
})


module.exports = router;
