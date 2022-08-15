const express = require('express')
const passport = require('passport')
const keys = require('./config/keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// generic register to let passport know there is a new strategy available
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken) => {
    console.log(accessToken)
}))
// passport.use(new FacebookStrategy({}))
// first arg is which strategy provider
// google server only give permission to access user's profile and email
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))