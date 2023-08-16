const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;


const ethnicityMapSchema = Schema({
    uid:{
        type:String,
    },
    ethnicityId:{
        type:String,
        ref:'Ethnicity'
    },
    entityid:{
        type:String,
        required:true
    },
},{timestamps:true});


module.exports = mongoose.model('EthnicityMap',ethnicityMapSchema);