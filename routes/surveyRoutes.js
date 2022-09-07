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

router.get('/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
})

router.post('/webhooks', (req, res) => { 
    // req.body contains a list of events and destructure the event object to url and email
    const p = new Path('/api/surveys/:surveyId/:choice')
    _.chain(req.body) // iterate req.body and map it
        .map(({email, url}) => {
                
        if (!url) {
          return res.status(400).json({ error: 'url is undefined' });
        } 
        // extract the route with surveyId and choice
        // create a parser object that extracts every wildcard match up from the route which is survey id and choice or null(cannot extract)
        const match = p.test(new URL(url).pathname)
        if (match) {
            return { 
                email: email.toLowerCase().trim(), 
                surveyId: match.surveyId,
                choice: match.choice
                }
            }
                
        })
    
    //iterate events and remove elements with undefined by using lodash compact 
        .compact()
        .uniqBy('email', 'surveyId') // lodash uniqBy to remove duplicate elements
        // surveyId, email and choice from event object
        .each(({surveyId, email, choice}) => 
        {
            Survey.updateOne({ // find the first match record with id and recipients with criteria
            _id: surveyId,
            recipients: {
            $elemMatch: { 
            email: email,
            responded: false
            }
            }
        }, { // update part
          $inc: {[choice]: 1}, // use key interpolation to evaluate at runtime to get yes | no and increment by 1
          $set: {'recipients.$.responded': true}, // set responded to true for recipients that retrieved from first part
          lastResponded: new Date()
          // $set: {'recipients.$.responded': true, lastResponded: new Date()}
        }).exec() // execute the query
   }
  ) // end of loop
    .value() // return the value        
    res.send({}) // tell sendgrid everything is ok, no need to resend request to prevent duplicate
})

router.post('/', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email: email.toLowerCase().trim()})), // an array of string contains all recipients email address, map(email address) to object
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