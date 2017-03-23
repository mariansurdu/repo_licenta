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
var Company=mongoose.model("Company");
var Data=mongoose.model("DataM");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function save(model,res) {
    model.save(function(err){
        if (err) console.log(err);
        else
            res.send(200);
    })
}


router.post('/createcompany',function (req,res) {
    var company=new Company;
    company.name=req.body.name;
    company.email=req.body.email;
    company.CUI=req.body.cui;
    company.teams=[];
    company.departments=req.body.departments;
    save(company,res);
    
})


router.post("/data",function(req,res){
    Data.find({userId:req.body.userId},function(err,data1){
        if (data.length==0) {
            var data=new Data();
            data.userId=1;
            data.dataUser=[{airquality:req.body.airquality,temperature:req.body.temperature,gas:req.body.gas,metan:req.body.metan,nh3:req.body.nh3,co:req.body.co,date:new Date(),co2:req.body.co2}];
            save(data,res);
        }
        else {
            Data.update({userId:req.body.userId})
        }
    })

})



router.post("/create",function(req,res){
  var user=new User();
  var data=req.body;
    var noCompany=false;
  user.name=data.name;
  user.lastname=data.lastname;
  user.email=data.email;
  user.password=encrypt(data.password);
  user.age=data.age;
    if (data.worker || data.teamleader) {
    Company.find({CUI:data.cui},function(err,data){
        if (data.length!=0) {
            if (data.worker) {
                user.personType=2;
            }
            if (data.teamleader) {
                user.personType=1;
            }
            user.save(function(err){
                if (err) console.log(err);
                else
                    res.send(200,{email:user.email,_id:user._id});
            })
        }
        else {
            noCompany=true;
            res.send(202);
        }
    })}
    else {
        user.personType=3;
        save(user,res);
    }
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
        res.send(200,{"email":req.body.email,"_id":data[0]._id});
      }
      else {
        res.send(401);
      }
    }

})
})


module.exports = router;
