const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const locationSchema = Schema({
    locationId :{
        type: String,
    },
    locationValue:{
        type : String,
        required:true
    }

},{timestamps:true});

locationSchema.pre('save',function (next){
    this.locationValue = this.locationValue.toLowerCase();
    this.locationId = uuidv4();
    next();
})

module.exports = mongoose.model('Location',locationSchema);