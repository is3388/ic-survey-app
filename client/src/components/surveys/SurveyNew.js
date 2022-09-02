// Wrapper component to toggle between SurveyForm and SurveyReview
import React, {useState} from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyReview from './SurveyReview'

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false)

const renderContent = () => {
  if (showFormReview)
  {
    return <SurveyReview onCancel = {() => setShowFormReview(false)}/>
  }
  return <SurveyForm onSurveySubmit = {() => setShowFormReview(true)} />

}

    return (
        <div>
            {renderContent()}
        </div>
    )
}

// use redux-form default behavior destroyOnUnmount: true to clear form data when user 
//navigate away the form such as Dashboard or click on Header link but not toggle between SurveyForm and SurveyReview
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)