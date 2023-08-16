const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const genderSchema = Schema({
    genderId :{
        type: String,
    },
    genderValue:{
        type : String,
        required:true
    }

},{timestamps:true});

genderSchema.pre('save',function (next){
    this.genderValue = this.genderValue.toLowerCase();
    this.genderId = uuidv4();
    next();
})

module.exports = mongoose.model('Gender',genderSchema);