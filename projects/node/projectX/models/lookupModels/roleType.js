const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const roleTypeSchema = Schema({
    roleTypeId :{
        type: String,
    },
    roleTypeValue:{
        type : String,
        required:true
    }

},{timestamps:true});

roleTypeSchema.pre('save',function (next){
    this.roleTypeValue = this.roleTypeValue.toLowerCase();
    this.roleTypeId = uuidv4();
    next();
})

module.exports = mongoose.model('RoleType',roleTypeSchema);