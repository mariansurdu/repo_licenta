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
var Team=mongoose.model("Teams");
var Planning=mongoose.model("Planning");

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



router.post('/posts',function (req,res) {
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


router.get("/companynews/:cui",function(req,res){
    News.find({cui:req.params.cui},function(err,data){
        if (err) res.send(err);
        else
            res.send(data);
    })
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



//worker if personType=2
//teamleader if personType=1
//individualif personType=3
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
        user.companyCui=req.body.companyCui;
    Company.find({CUI:data.cui},function(err,data){
        if (data.length!=0) {
            if (data.worker) {
                user.personType=2;
            }
            if (data.teamleader) {
                user.personType=1;
            }
            var team=new Team();
            user.save(function(err){
                if (err) console.log(err);
                else {
                    res.send(200, {
                        email: user.email,
                        _id: user._id,
                        personType: user.personType,
                        companyCui: user.companyCui
                    });
                }
                })
        }
        else {
            noCompany=true;
            res.send(202);
        }
    })}
    else {
        user.personType=3;
        user.save(function(err){
            if (err) console.log(err);
            else
                res.send(200,{email:user.email,_id:user._id,personType:user.personType});
        })
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
                    res.send(200,{"email":req.body.email,"_id":data[0]._id,"sessionId":req.sessionID,"name":data[0].name,"personType":data[0].personType});
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
//this is a functionality only for the teamleader
//he can see his teams and can add users to a team or remove a user
//he can see the data from members of team and some statistics about their healt
//and the quality of air that they are breath
//he can send a message to a specified user to take care about him


router.get("/teams/:idlead",function(req,res){
    var cui=req.params.cui;
    var idlead=req.params.idlead;
})

//adding a new team
router.post("/newteam",function(req,res){
    var team=new Team();
    team.teamName=req.body.teamName;
    team.companyCui=req.body.companyCui;
    team.team=[];
    team.leadId=req.body.leadId;
    save(team,res);
})

router.post("/newworker/:id",function (req,res) {
    Team.update({_id:req.params.id},{$addToSet:{team:req.body.idWorker}},function(err){
        if (err) console.log(err);
        else
         res.send("User has been added succesfully to team");
    })
})





//here workers and teamleaders can watch the planning.
//Planning contains administrative activities
router.get("/planning/:teamid",function(req,res){
    Planning.find({teamId:req.params.teamId},function (err,data){
        if (err) res.send(err)
        else
            res.send(data);
    })
})


router.post("/saveactiviti/:planningId",function(req,res) {
    Planning.find({_id:req.params.planningId},function(err,data){
        if (!err)
        Planning.update({_id:req.params.planningId},{$addToSet:{activities:req.body.activity}},function(err){
            if(err) res.send(err);
            else
               res.send(200);
        })
    })
})



module.exports = router;
