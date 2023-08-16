const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const genderMapSchema = Schema({
    uid:{
        type:String,
    },
    genderId:{
        type:String,
        ref:'Gender'
    },
    entityid:{
        type:String,
        required:true
    },
},{timestamps:true});


module.exports = mongoose.model('GenderMap',genderMapSchema);