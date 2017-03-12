var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var companySchema=new Schema({
    name:String,
    CUI:String,
    email:String,
    teams:Object,
    departments:Object
})
mongoose.model( 'Company',companySchema);