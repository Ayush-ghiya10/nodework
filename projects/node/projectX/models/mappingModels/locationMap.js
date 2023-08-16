const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const locationMapSchema = Schema({
    uid:{
        type:String,
    },
    locationId:{
        type:String,
        ref:'Location'
    },
    entityid:{
        type:String,
        required:true
    },
    entityType:{
        type:String,
        required:true,
        enum:['project','role','audition','work']
    }
},{timestamps:true});

module.exports = mongoose.model('LocationMap',locationMapSchema);