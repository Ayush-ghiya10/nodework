const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
        },
        coordinates: [Number]
    }
}, { timestamps: true })

userSchema.index({
    location: '2dsphere'
})

userSchema.pre('save', function (next) {
    if (
        this.isNew &&
        Array.isArray(this.location) &&
        0 === this.location.length
    ) {
        this.location = undefined;
    }
    next();
})

module.exports = mongoose.model('User', userSchema)