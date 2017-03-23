var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var dataMSchema=new Schema({
    userId:String,
    gas:Object,
    airquality:Object,
    temperature:Object,
    metan:Object,
    nh3:Object,
    co:Object,
    co2:Object,
    date:Date

})
mongoose.model( 'DataM',dataMSchema);