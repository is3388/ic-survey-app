import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom' //withRouter can access history object to navigate around
import { formFields } from './formFields'
import { submitSurvey } from '../../actions'

const SurveyReview = ({onCancel}) => {
    
    const formValues = useSelector(state => state.form.surveyForm.values)
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(formValues)

    const renderFields = () => {
       return (
           formFields.map(field => {
              return ( 
                <div key={field.name}>
                  <label>
                    {field.label}
                    </label>
                    <div>
                    {formValues[field.name]}
                    </div>
                </div>   
                )
                }) 
            )   
           }
   
    return (
        <div>
            <h5>Please confirm all entries.</h5>
            {renderFields()}
            <button className='grey darken-1 btn-flat white-text'
                    onClick={onCancel}
                    style={{marginTop:'1rem'}}>
                        Back
            </button>
            <button className='grey darken-1 btn-flat white-text right'
                    style={{marginTop:'1rem'}}
                    onClick={() => dispatch(submitSurvey(formValues, history))}>  
                Send Survey
                <i className='material-icons right'>email</i>
            </button>

        </div>
    )
}

export default withRouter(SurveyReview)