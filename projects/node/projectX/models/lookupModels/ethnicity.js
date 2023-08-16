const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;

const ethnicitySchema = Schema({
    ethnicityId :{
        type: String,
    },
    ethnicityValue:{
        type : String,
        required:true
    }

},{timestamps:true});

ethnicitySchema.pre('save',function (next){
    this.ethnicityValue = this.ethnicityValue.toLowerCase();
    this.ethnicityId = uuidv4();
    next();
})

module.exports = mongoose.model('Ethnicity',ethnicitySchema);