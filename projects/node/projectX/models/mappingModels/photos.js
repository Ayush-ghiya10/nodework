const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const photosSchema = Schema({
    photoId:{
        type:String,
    },
    entityid:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('Photo',photosSchema);