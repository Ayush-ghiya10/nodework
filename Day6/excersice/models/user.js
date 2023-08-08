const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {v4:uuidv4} = require('uuid');
const userSchema = mongoose.Schema({
    id:String,
    username : String,
    email : {type:String,required:true},
    password:{type:String,required:true},
    resetToken:{type:String} 

})
userSchema.pre('save',function (next){
    this.id = uuidv4();
    this.email = this.email.toLowerCase();
    bcrypt.hash(this.password,10).then((hashedPassword)=>{
        this.password =  hashedPassword;
        next();
    })
})

module.exports = mongoose.model('User',userSchema);