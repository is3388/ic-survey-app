import React from 'react'
import { Link } from 'react-router-dom'
// reduxForm is built-in value like connector that allows form/component to communicate with redux store
// Field is helper to rnder any type of HTML element such as textarea, text/file input, checkbox, radio, dropdown
import { Field, reduxForm } from 'redux-form' 
import SurveyField from './SurveyField'
import {validateEmail} from '../../utils/validateEmail'
import formFields from './formFields'

// use this approach (two fields with different values) with map function to create an new array

const SurveyForm = ({handleSubmit, onSurveySubmit}) => {
// handleSubmit is one of built-in helpers like reset, submitting from reduxForm

 const renderFields = () => {
    return (
        <div>
       {formFields.map(({ name, label }) => {
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
    <form onSubmit={handleSubmit(onSurveySubmit)}>
      {renderFields()}
      <div style={{paddingBottom:'2rem'}}>
        <Link to='/surveys' className='red btn-flat white-text'>Cancel</Link>
        <button type="submit" className="grey darken-2 btn-flat right white-text">
            Next
        </button>
      </div>
    </form>
    </div>
   )
}

const validate = values => { // values object contain all different values such as body, title, emails, subject of the form
  const errors = {} // errors object is empty
  /*if (!values.title) {
    errors.title = 'You must provide a title'
  }
  if (!values.subject) {
    errors.subject = 'You must provide a subject'
  }
  if (!values.body) {
    errors.body = 'You must provide email body'
  }*/

  errors.emails = validateEmail(values.emails || '')

  formFields.forEach(({name, label}) => {
    if (!values[name]) {
      errors[name] = `${label} is required` 
    }
  })
 
  return errors
}

export default reduxForm({
  validate, // validate is key and value is a function called validate
  form: 'surveyForm', // a unique identifier for this form
  destroyOnUnmount: false // keep the data entered on the form for Back button in SurveyReview
})(SurveyForm)