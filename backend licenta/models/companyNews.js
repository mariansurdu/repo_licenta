var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var companyNewsSchema=new Schema({
   personName:String,
    userId:String,
    news:String,
    date:Date,
    photo:String,
    comments:Array,
    company:String,
    companyId:String
})
mongoose.model( 'CompanyNews',companyNewsSchema);