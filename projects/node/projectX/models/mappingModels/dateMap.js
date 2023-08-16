const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;


const dateMapSchema = Schema({
    uid:{
        type:String,     
    },
    individualDate:{
        type:Date,
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



module.exports = mongoose.model('DateMap',dateMapSchema);