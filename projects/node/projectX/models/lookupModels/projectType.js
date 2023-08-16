const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const projectTypeSchema = Schema({
    projectTypeId :{
        type: String,
    },
    projectTypeValue:{
        type : String,
        required:true
    }

},{timestamps:true});

projectTypeSchema.pre('save',function (next){
    this.projectTypeValue = this.projectTypeValue.toLowerCase();
    this.projectTypeId = uuidv4();
    next();
})

module.exports = mongoose.model('ProjectType',projectTypeSchema);