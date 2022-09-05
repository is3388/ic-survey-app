const express = require('express')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose')
const Survey = mongoose.model('Survey')
const mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')

const router = express.Router()

router.get('/thanks', (req, res) => {
    res.send('Thanks for voting!')
})

router.post('/webhooks', (req, res) => { // req.body contains a list of events and event is event object, destructure it to url and email
    const events = _.map(req.body, ({email, url}) => {
        // extract the route with surveyId and choice
        const pathname = new URL(url).pathname
        // create a parser object that extracts every wildcard match up from the route which is survey id and choice or null(cannot extract)
        const p = new Path('/api/surveys/:surveyId/:choice')
        //console.log(p.test(pathname))
        if (!url) {
          return res.status(400).json({ error: 'Some error message' });
        } else {

                const match = p.test(pathname)
                if (match) {
                    return { email, 
                             surveyId: match.surveyId,
                             choice: match.choice
                            }
                            }
                }
        })
    //console.log(events)
    //iterate events and remove elements with undefined by using lodash compact and then uniqBy to remove duplicate elements
    const compactEvents = _.compact(events)
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
    console.log(uniqueEvents)
    res.send({}) // tell sendgrid everything is ok, no need to resend request to prevent duplicate
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