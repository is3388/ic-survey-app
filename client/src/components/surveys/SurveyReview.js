import React from 'react'
import { useSelector } from 'react-redux'
import {formFields} from './formFields'

const SurveyNew = ({onCancel}) => {
    console.log(formFields)

    const formValues = useSelector(state => state.form.surveyForm.values)
    console.log(formValues)

    const renderFields = () => {
      
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
                 
           }
   
    return (
        <div>
            <h5>Please confirm all entries.</h5>
            {renderFields}
            <button className='grey darken-1 btn-flat white-text'
                    onClick={onCancel}>
                        Back
                    </button>
        </div>
    )
}

export default SurveyNew