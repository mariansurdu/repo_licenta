var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var companyNewsSchema=new Schema({
   personName:String,
    news:String,
    date:Date,
    photo:String,
    comments:Array,
    company:String
})
mongoose.model( 'CompanyNews',companyNewsSchema);