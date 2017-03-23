var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var dataMSchema=new Schema({
    userId:String,
    dataUser:Array

})
mongoose.model( 'DataM',dataMSchema);