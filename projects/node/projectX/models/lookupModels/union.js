const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const unionSchema = Schema({
    unionId :{
        type: String,
    },
    unionValue:{
        type : String,
        required:true
    }

},{timestamps:true});

unionSchema.pre('save',function (next){
    this.unionValue = this.unionValue.toLowerCase();
    this.unionId = uuidv4();
    next();
})

module.exports = mongoose.model('Union',unionSchema);