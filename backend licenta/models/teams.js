var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamsSchema=new Schema({
    teamName:String,
    companyName:String,
    team:Array,
    leadId:String
})
mongoose.model( 'Teams',teamsSchema);