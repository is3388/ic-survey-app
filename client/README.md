## Email Survey

#### Demo : https://ic-survey-app.herokuapp.com/

###### Sending Emails to Clients for Feedback.

---

## Description

Full Stack Application using MERN (Mongo, Express, React, Node) technologies to create Surveys by business owners and send surveys to their customers.

App uses Stripe API to mimic payments to purchase credits which are used to create survyes. App also uses SendGrid API to create emails dipatching to customers.  

## Instructions

- Login using Google login.
- App requires survey owner to maintain a credit balance. Add Credits upon login and display the credits balance.
- Once login successfully, a list of surveys created by the login user display on the dashboard where it shows the total number of response to each survey.
- Click on the red + icon on the bottom right side of the screen to create a new Survey.
- Click on the delete button for the corresponding survey on the dashboard, survey owner can delete a survey.
- Fill out the Survey Form and send to the customers' email addresses.
- Customers who receive the emails, can respond to the Survey through a Yes/No option from the email. 
- Customers will get different thankyou notes based on their feedback choice.

#### Backend

- The backend of this project uses Express and MongoDB. 
- Backend provides API to connect with our React front-end application. 
- Backend uses passport Google OAuth 2.0 Strategies to manage authentication. 
- App uses SendGrid API to send emails to customers. The API allows sending emails to multiple email addresses and allows reply functionality once a customer clicks on Yes/No option.  Survey owners will know how many responses have they recieved for a given Survey. 
- App uses Stripe API to mimic payments. Stripe provides a test credit card number (4242 4242 4242 4242) to be used on adding credits. USD10.00 is added for each credit added. Once a user maintains a positive balance, the user can create Surveys. Each Survey costs 1 credit.

#### Front End

- The Front End of the application uses React.
- App uses Redux for state management and tracks authenticated users, user details and surveys created by the user.
- App uses Layout components to display public and private content depending on user authentication state.
- App uses Materialize.CSS for simplistic and responsive view. 

#### App is built using the following tech stack :

- Axios
- Express
- Heroku
- Google OAuth
- Materialize CSS
- Mongo DB
- React
- Redux 
- SendGrid API
- Stripe API
- App is developed with Prod and Dev environments