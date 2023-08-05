const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {v4:uuidv4} = require('uuid');
const userSchema = mongoose.Schema({
    id:{
        type: String,
    },
    displayName: String,
    email: {
        type:String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required : true,
    },
    userType:{
        type:String,
        required:true,
        default:'talent',
        enum:['talent','cd','admin']
    },
    about:{
        type:String,   
    },

    age:{
        type:Number,
        default:0
    } 
});
userSchema.pre('save',function (next){
    this.id = uuidv4();
    this.email = this.email.toLowerCase();
    bcrypt.hash(this.password,10).then((hashedPassword)=>{
        this.password =  hashedPassword;
        next();
    })
})
module.exports = mongoose.model('User',userSchema);