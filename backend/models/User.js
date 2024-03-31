const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;


