const keys = require('../config/keys')
const express = require('express')
const stripe= require('stripe')(keys.stripeSecretKey) // passing the stripe secret key
const requireLogin = require('../middlewares/requireLogin')

const router = express.Router()

router.post('/', requireLogin, async (req, res) => {
   const charge = await stripe.charges.create({
      amount: 1000, // in cents
      currency: "usd",
      description: "$10 for 10 credits",
      source: req.body.id // id from the token that send back from stripe to us and we take this token to update the user's credit
    })
    console.log(charge)
    req.user.credits += 10 // this doesn't save in user object until save
    const user = await req.user.save()
    res.status(200).json(user)
})


module.exports = router