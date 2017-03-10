var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamsSchema=new Schema({
    teamName:String,
    companyName:String,
    Department:String,
    team:Object,
    lead:String
})
mongoose.model( 'Teams',teamsSchema);