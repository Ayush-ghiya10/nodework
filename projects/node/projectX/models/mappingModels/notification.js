const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const Schema = mongoose.Schema;


const notificationSchema = Schema({
    uid:{
        type:String,
    },
    displayName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'inprogress',
        enum:['inprogress','sent','failed']
    }
},{timestamps:true});


notificationSchema.pre('save',function(next){
    this.uid = uuidv4();
    next();
})
module.exports = mongoose.model('Notification',notificationSchema);