var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamsSchema=new Schema({
    gas:Object,
    airquality:Object,
    temperature:Object
})
mongoose.model( 'Teams',teamsSchema);