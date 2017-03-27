var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var usersSchema=new Schema({
    name:String,
    lastname:String,
    email:String,
    password:String,
    age:Number,
    worker:Boolean,
    teamleader:Boolean,
    personType:Number
})
mongoose.model('User',usersSchema);