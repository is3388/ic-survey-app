const express = require('express')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose')
const Survey = mongoose.model('Survey')

const router = express.Router()

router.post('/', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email: email.trim()})), // an array of string contains all recipients email address, map(email address) to object
        _user: req.user.id,
        dateSent: Date.now()
    })
    const newSurvey = survey.save()
    res.status(201).json(newSurvey)
})

router.get('/', requireLogin, async (req, res) => {

})

module.exports = router