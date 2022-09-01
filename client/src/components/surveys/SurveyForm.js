import React from 'react'
import { Link } from 'react-router-dom'
// reduxForm is built-in value like connector that allows form/component to communicate with redux store
// Field is helper to rnder any type of HTML element such as textarea, text/file input, checkbox, radio, dropdown
import { Field, reduxForm } from 'redux-form' 
import SurveyField from './SurveyField'

const SurveyForm = ({handleSubmit}) => {
// built-in helpers from reduxForm
  //const { handleSubmit } = props
// use this approach (two fields with different values) with map function to create an new array
  const FIELDS = [
    { name: "title", label: "Title" },
    { name: "subject", label: "Subject Line" },
    { name: "body", label: "Email Body" },
    { name: "emails", label: "Recipient List" }
  ] 

 const renderFields = () => {
    return (
        <div>
       {FIELDS.map(({ name, label }) => {
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
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      {renderFields()}
      <div style={{paddingBottom:'2rem'}}>
        <Link to='/surveys' className='red btn-flat white-text'>Cancel</Link>
        <button type="submit" className="red btn-flat right white-text">
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