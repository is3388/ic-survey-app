import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Payments = () => {
    return (
        <StripeCheckout
            amount={500} // the amount by default is US dollar in cents. That's the amount we want user to put in
            token={token=>console.log(token)} //token expects a calledback after successfully retrieved authorization token from Stripe API
            stripeKey={process.env.REACT_APP_STRIPE_KEYgi}
        />
    )
}

export default Payments