const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema  = Schema({
    displayName:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

userSchema.pre('save',function (next){
    this.email = this.email.toLowerCase();
    bcrypt.hash(this.password,10).then((hashedPassword)=>{
        this.password =  hashedPassword;
        next();
    })
})

module.exports = mongoose.model('User',userSchema);

