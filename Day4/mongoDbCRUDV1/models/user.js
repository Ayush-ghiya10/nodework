const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName:{
        type :String,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    age: {
        type:Number,
        default:0
    },
    about:String
})

module.exports = mongoose.model('User',userSchema);