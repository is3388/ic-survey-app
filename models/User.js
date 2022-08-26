const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema ({
//const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    credits: {
        type: Number,
        default: 0
    }
})

//module.exports = mongoose.model('User', userSchema)
mongoose.model('User', userSchema)