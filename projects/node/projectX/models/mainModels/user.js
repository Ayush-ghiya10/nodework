const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = Schema({
    userId :{
        type: String,
    },
    firstName:{
        type : String,
        required:true
    },
    lastName:{
        type : String,
    },
    email:{
        type:String,
        required:true
    },
    OTP:{
        type:Number
    },
    workLocation:{
        type:String
    },
    mobileNo:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
    },
    userType:{
        type:String,
        required:true,
        default:'talent',
        enum:['talent','cd','admin']
    },
    forcePasswordReset:{
        type:Boolean,
        required:true,
        default:false
    },
    profilePicUrl:{
        type:String,
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type:String,
        required:true,
        default:'active',
        enum:['active','inactive','blocked']
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    }

},{timestamps:true});

userSchema.pre('save',function (next){
    this.email = this.email.toLowerCase();
    next();
})

module.exports = mongoose.model('User',userSchema);