var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var dataUsersSchema=new Schema({
    gas:Object,
    airquality:Object,
    temperature:Object
})
mongoose.model( 'DataUsers',dataUsersSchema);