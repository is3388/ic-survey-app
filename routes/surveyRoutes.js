const express = require('express')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose')
const Survey = mongoose.model('Survey')
const mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const router = express.Router()

router.get('/thanks', (req, res) => {
    res.send('Thanks for voting!')
})

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
    // send email passing survey object and the template
    mailer(survey, surveyTemplate(survey))
    try {
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
        res.status(200).send(user)
    }
    catch(error) {
        res.status(422).send(error)
    }
})

router.get('/', requireLogin, async (req, res) => {

})

module.exports = router