import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Payments = () => {
    return (
        <StripeCheckout
            name='Email Survey'
            description='$10 for 10 email credits'
            amount={1000} // the amount by default is US dollar in cents. That's the amount we want user to put in
            token={token=>console.log(token)} //token represents the entire charge expects a calledback after successfully retrieved authorization token from Stripe API
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
            <button id='addCredit' className='btn'>Add Credits</button>
        </StripeCheckout>
    )
}

export default Payments