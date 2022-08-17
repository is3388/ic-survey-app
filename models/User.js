const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema ({
//const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
})

//module.exports = mongoose.model('User', userSchema)
mongoose.model('User', userSchema)