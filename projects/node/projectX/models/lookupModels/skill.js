const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const skillSchema = Schema({
    skillId :{
        type: String,
    },
    skillValue:{
        type : String,
        required:true
    }

},{timestamps:true});

skillSchema.pre('save',function (next){
    this.skillValue = this.skillValue.toLowerCase();
    this.skillId = uuidv4();
    next();
})

module.exports = mongoose.model('Skill',skillSchema);