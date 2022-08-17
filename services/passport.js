const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('User')

// passport configuration
// generic register to let passport know there is a new strategy available
    passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // after permission is granted to express server and invoke callback (2nd arg) redirect user
}, (accessToken, refreshToken, profile, done) => { // done is to tell passport the task succeed or not
    new User({googleId: profile.id}).save()
}))

// passport.use(new FacebookStrategy({options here})) for multiple strategy
