var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamsSchema=new Schema({
    teamName:String,
    companyName:String,
    team:Array,
    leadId:String,
    photoUrl:String,
    companyCui:String
})
mongoose.model( 'Teams',teamsSchema);