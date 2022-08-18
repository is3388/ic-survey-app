const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session') 
const passport = require('passport') 
const keys = require('./config/keys')
require('./models/User')
require('./services/passport') // make sure the configuration execute once and no need to export anything, so no variable
const authRouter = require('./routes/authRoutes')

mongoose.connect(keys.mongoURI)
const app = express()

// enable cookie
// maxAge is the expiration to the cookie in millisecond
// keys array to be more secured that can randomly pick and sign, encrypt the cookie
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:[keys.cookieKey]
}))

// tell passport to make use of cookies to handle authentication
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// authRoutes return a function and immediately call that function with the app object
//require('./routes/authRoutes')(app)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))