const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;


const skillMapSchema = Schema({
    uid:{
        type:String,
    },
    skillId:{
        type:String,
        ref:'Skill'
    },
    entityid:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('SkillMap',skillMapSchema);