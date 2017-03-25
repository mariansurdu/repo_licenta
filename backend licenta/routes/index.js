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
var News=mongoose.model("CompanyNews");

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
    var company=new Company();
    company.name=req.body.name;
    company.email=req.body.email;
    company.CUI=req.body.cui;
    company.teams=[];
    company.departments=req.body.departments;
    save(company,res);
    
})

router.post('/createnews',function (req,res) {
    var news=new News();
    news.personName=req.body.personName;
    news.userId=req.body.userId;
    news.news=req.body.news;
    news.date=new Date();
    news.photo=req.body.photo;
    news.company=req.body.company;
    news.companyId=req.body.companyId;
    news.comments=[];
    save(news,res);
})


router.post("/data",function(req,res){
    Data.find({userId:1},function(err,data1){
        var x={airquality:"req.body.airquality",temperature:req.body.temperature,gas:req.body.gas,metan:req.body.metan,nh3:req.body.nh3,co:req.body.co,date:new Date(),co2:req.body.co2};

        console.log(data1.length);
        if (data1.length==0) {
            console.log("aici")
            var data=new Data();
            data.userId=1;
            data.dataUser=[x];
            save(data,res);
        }
        else {
            console.log("aicia")
            Data.update({userId:1},{$addToSet:{dataUser:x}},function(err){
                if (err) console.log(err);
                else
                  console.log("OK Update!");
            })
        }
    })

})

router.get("/datauser/:id",function(req,res){
    var userId=req.params.id;
    console.log(userId);
    Data.find({userId:userId},function(err,data){
        if (err) res.send(err);
        else res.json(data);
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
    var nuser=new User(req.body);
    console.log('XXXXXXXXXXXXXXXXXXX User-ul cu care vrei sa te loghezi'+JSON.stringify(nuser));
    nuser._id=1235;
    nuser.username=req.body.email;
    req.logIn(nuser, function(err) {
        if (err) {
            console.log("1"+err);
            return next(err);}
        User.find({email:req.body.email},function(err,data){
            if(data.length==0){
                res.send("That username is not registered!!!");
            }
            else {
                console.log(req.session);
                console.log(decrypt(data[0].password));
                console.log(req.body.password);
                if (decrypt(data[0].password)==req.body.password){
                    res.send(200,{"email":req.body.email,"_id":data[0]._id,"sessionId":req.sessionID});
                    req.session.userinfo={"email":req.body.email,"_id":data[0]._id,"sessionId":req.sessionID}
                }
                else {
                    res.send(401);
                }
            }
        })
    });
})

router.get("/profiledata/:id",function(req,res){
    var id=req.params.id;
    User.find({_id:id},function(err,data){
        if (err) res.send(err);
        else {
            var dataToSend={name:data[0].name,lastname:data[0].lastname,email:data[0].email,age:data[0].age,worker:data[0].worker,teamleader:data[0].teamleader,cui:data[0].CUI};
            res.json(dataToSend);
        }
    })
})





module.exports = router;
