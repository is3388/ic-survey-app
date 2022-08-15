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
    callbackURL: '/auth/google/callback' // after permission is granted to express server and redirect user
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access Token:', accessToken)
    console.log('Refesh Token:', refreshToken)
    console.log('Profile:', profile)
}))
// passport.use(new FacebookStrategy({options here}))
// express server make the first request to google server
// and tell passport start authentication flow. first arg is which strategy provider
// express server only ask to get access to user's profile and email
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
// route handler to handle after permission is granted and redirect user to express server
app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))