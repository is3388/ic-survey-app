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

/*router.get('/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
})*/

router.get('/:surveyId/:choice', (req, res) => {
    res.setHeader('Content-type','text/html')
    if (req.params.choice === 'yes')
    {
        res.send('<h1>Email Survey</h1><p><strong>Thanks for your voting and support. We love to hear your positive feedback on our service.</strong></p><p><strong>We promise that we will continue to bring out the best service to our customers.</strong></p>')
    }
    else {
    res.send('<h1>Email Survey</h1><p><strong>Thanks for your voting. We are so sorry to hear that you are not fully satisfied with our service.</strong></p><p><strong>We promise that we will make possible improvement and bring out the best service to our customers.</strong></p>')
    }
})

router.post('/webhooks', (req, res) => { 
  
    // req.body contains a list of events and destructure the event object to url and email
    // create a parser object and use Path to extract every wildcard :something that match up from the route 
    // like survey id, choice or null (in case can't extract)
    const p = new Path('/api/surveys/:surveyId/:choice') 
    _.chain(req.body) // iterate const events = req.body and map it each event contains email url
          .filter(({event}) => event === 'click') // newly add
        .map(({email, url}) => {
                
        //pathname is only the path without domain name and match is an object either with survey id and choice or null       
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
        }).exec() // we only build the query, so execute the query. But no need .exec() if use async await as then is implicitly included
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
    /* use find with 2nd argument
      const surveys = await Survey.find(
      { _user: req.user.id },
      { recipients: false }
    ) // use projection
    const surveys = await Survey.find({ _user: req.user.id },[-recipients])*/
      const surveys = await Survey.find({_user: req.user.id})
        .sort({dateSent: -1})
        .select('-recipients') // exclude recipients from the query
        //.select({recipients: false})
        
        if (!surveys) {
          return res.status(404).send('No survey found')
        }
        res.status(200).send(surveys)
    })

router.delete('/:surveyId', requireLogin, async (req, res) => {
    const survey = await Survey.findById(req.params.surveyId)
    if (!survey) {
        return res.status(404).send('No survey found')
    }
    if (survey._user.toString() !== req.user.id) {
        return res.status(401).send('Not authorized')
    }
    await survey.remove()
    res.status(200).send('Survey deleted')
})

module.exports = router