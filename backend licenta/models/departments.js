var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var departmentsSchema=new Schema({
    name:String,
    manager:String,
    noOfUsers:Number
})
mongoose.model( 'Departments',departmentsMSchema);