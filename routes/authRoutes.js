const express = require('express')
const passport = require('passport')

const router = express.Router()

// let the code connects to the server code via app object
/*module.exports = (app) => {

// express server make the first request to google server
// and tell passport start authentication flow. first arg is the strategy provider
// express server only ask to get access to user's profile and email
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
// route handler to handle after permission is granted and redirect user to that URL express server
app.get('/auth/google/callback', passport.authenticate('google'))
} */

// express server make the first request to google server
// and tell passport start authentication flow. first arg is the strategy provider
// express server only ask to get access to user's profile and email
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
// route handler to handle after permission is granted and redirect user to that URL express server
router.get('/google/callback', passport.authenticate('google'))

module.exports = router

