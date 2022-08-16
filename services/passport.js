const passport = require('passport')
const keys = require('../config/keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy

// passport configuration
// generic register to let passport know there is a new strategy available
const passportConfig = () => {
    passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // after permission is granted to express server and redirect user
}, (accessToken, refreshToken, profile, done) => { // done is to tell passport the task succeed or not
    console.log('Access Token:', accessToken)
    console.log('Refesh Token:', refreshToken)
    console.log('Profile:', profile)
}))
}
// passport.use(new FacebookStrategy({options here})) for multiple strategy

module.exports = {
    passportConfig
}