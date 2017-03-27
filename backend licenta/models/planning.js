var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var planningSchema=new Schema({
    teamId:String,
    activities:Array,
    lead:String
})
mongoose.model('Planning',planningSchema);