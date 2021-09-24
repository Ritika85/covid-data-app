const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let data= new Schema({
    date:{
        type:Date,
    },
    state:{
        type:String,
    },
    cases:{
        type:Number
    },
    deaths:{
        type:Number
    }
});

module.exports =mongoose.model('CovidData', data);