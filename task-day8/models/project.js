const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillsRequired: {
        type: [String]
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)