const sendgrid = require("@sendgrid/mail")
const keys = require("../config/keys")
 
sendgrid.setApiKey(keys.sendGridKey)
// subject and recipients from survey object
module.exports = async ({ subject, recipients }, content) => {
  const msg = { // email from each recipient
    to: recipients.map(({ email }) => email),
    from: keys.sendGridEmail, // Use the email address registered on SendGrid
    subject: subject,
    html: content,
    tracking_settings: {
      click_tracking: {
        //enable_text: true,
        enable: true
      }
    }
  }
  try {
    if (recipients.length < 1) {
        return null
    }

    const response = await sendgrid.sendMultiple(msg);
    return response
  } catch (error) {
    console.error(error)
 
    if (error.response) {
      console.error(error.response.body)
    }
  }
}