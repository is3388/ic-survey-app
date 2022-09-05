const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session') 
const passport = require('passport') 
const keys = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./services/passport') // make sure the configuration execute once and no need to export anything, so no variable
const authRouter = require('./routes/authRoutes')
const billingRouter = require('./routes/billingRoutes')
const surveyRouter = require('./routes/surveyRoutes')

mongoose.connect(keys.mongoURI)
const app = express()

// app.set('trust proxy', true)

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

// authRoutes return a function and immediately call that function with the express app object
//require('./routes/authRoutes')(app)
app.use('/auth', authRouter)
app.use('/api/stripe', billingRouter)
app.use('/api/surveys', surveyRouter)

if (process.env.NODE_ENV === 'production') {
    // Express serve up public assets such as main.js (all js files to build the front end), main.css files
    // when ready to deploy, run npm run build in client directory to get client/build/static/css and js files
    app.use(express.static('client/build'))
    // Express serve up index.html file if it still doesn't recognize the route (no matching)
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
// add extra line for build