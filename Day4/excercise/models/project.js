const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');

const projectSchema = mongoose.Schema({
    id:{
        type:String,
    },
    projectName :{
        type:String,
        required:true,
    },
    creatorEmail:{
        type:String,
        required:true
    },
    projectType:{
        type:String,
        required:true,
        default:'movie',
        enum:['movie','webseries','advertisement']
    },
    description:{
        type:String,
    },
    numberOfTalentsRequired:{
        type:Number
    }
});
projectSchema.pre('save',function (next){
    this.projectName = this.projectName.toLowerCase();
    this.id = uuidv4();
    next();
})
 
module.exports = mongoose.model('Project',projectSchema);