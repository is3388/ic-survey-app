import React from 'react'
import { Link } from 'react-router-dom'
// reduxForm is built-in value like connector that allows form/component to communicate with redux store
// Field is helper to rnder any type of HTML element such as textarea, text/file input, checkbox, radio, dropdown
import { Field, reduxForm } from 'redux-form' 
import SurveyField from '../surveys/SurveyField'

const SurveyForm = (props) => {
// built-in helpers from reduxForm
  const { handleSubmit, pristine, reset, submitting } = props
// use this approach (two fields with different values) with map function to create an new array
  const fieldConfig = [
    { name: "surveyTitle", label: "Title" },
    { name: "surveySubject", label: "Subject Line" },
    { name: "surveyBody", label: "Email Body" },
    { name: "surveyRecipients", label: "Recipient List" }
  ] 

  const renderFields = () => {
    return (
        <div>
            {/*<Field 
                label='Survey Title' 
                type='text' 
                name='title' 
                component={SurveyField} 
            />
            <Field 
                label='Subject Line' 
                type='text' 
                name='subject' 
                component={SurveyField} 
            />
            <Field 
                label='Email Body' 
                type='text' 
                name='body' 
                component={SurveyField} 
            />
            <Field 
                label='Recipient List (use "," to separate emails)' 
                type='text' 
                name='emails' 
                component={SurveyField} 
            /> */}

        {fieldConfig.map(({ name, label }) => {
          return (
            <Field
              key={name}
              name={name}
              label={label}
              type="text"
              component={SurveyField}
            />
          )
        })}
        </div>
    )

  }

  return (
    <div>
    <form onSubmit={handleSubmit(values => console.log(values))}>
      {/*<div>
        <label>Survey Title</label>
        <div>
          <Field name="surveyTitle" component="input" type="text" placeholder="Survey Title"/>
        </div>
      </div>
      <div>
        <label>Subject Line</label>
        <div>
          <Field name="subjectLine" component="input" type="text" placeholder="Subject Line"/>
        </div>
      </div>
      <div>
        <label>Email Body</label>
        <div>
          <Field name="emailBody" component="input" type="email" placeholder="Email Body"/>
        </div>
      </div>
      <div>
        <label>Recipient List (please use comma separator to separate each recipent's email)</label>
        <div>
          <Field name="recipients" component="input" type="email" placeholder="Recipients"/>
        </div>
      </div>*/}
      {renderFields}
      <div>
        <Link to='/surveys' className='orangered btn-flat white-text'>Cancel</Link>
        <button type="submit" className="orangered btn-flat right white-text">
            Next
        </button>
      </div>
    </form>
    </div>
   )
}

export default reduxForm({
  form: 'surveyForm'  // a unique identifier for this form
})(SurveyForm)