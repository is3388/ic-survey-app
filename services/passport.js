const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('User')

// function will be auto called by passport to create a cookie with token
passport.serializeUser((user, done) => { // user is an instance of User model and user.id is the _id that mongo created
    done(null, user.id) // 1st arg is error object and 2nd arg is whatever we pull out from DB either retreive a user or create new user
    // save a cookie with user's id
})

// function will be auto called by passport to convert the token into user instance
passport.deserializeUser((id, done) => { // id is what we stuffed into cookie in serializeUser function
    User.findById(id)
    .then(user => {
        done(null, user) // 
    })
})

// passport configuration
// generic register to let passport know there is a new strategy available
    passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', // after permission is granted to express server and invoke callback (2nd arg) redirect user
    proxy: true // to tell google strategy to trust requests coming thru a heroku proxy and calculate the URL correctly that matches we authorize
}, (accessToken, refreshToken, profile, done) => { // done is to tell passport the task succeed or not
    User.findOne({googleId: profile.id})
    .then((existingUser) => {
        if(existingUser) {
            done(null, existingUser) // first arg is error object and 2nd arg is the user record either found or created
        }
        else {
            new User({googleId: profile.id}).save() 
             .then(user => done(null, user))
        }
    }  )
}))

// passport.use(new FacebookStrategy({options here})) for multiple strategy
