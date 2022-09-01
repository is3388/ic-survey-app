import React from 'react'

// {input} from props.input that reduxForm passes props to component
// outer {} is the whole props object
// input object has lots of event handlers attached to it
// reduxForm wire up event handlers like onChange, onBlur, onFocus
// meta is title, subject, body and emails. it has properties of touched, active and error. touched is user clicks in and then clicks out
// ... input is passing whatever input properties are
// acive is true as soon as you touch it and touched && error is to prevent the error shows when the page loads up. Make sure user clicks in and clicks out, then shows the error*
const SurveyField = ({input, label, meta: {touched, active, error}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '0.5rem'}}/>
            <div className='red-text' style={{marginBottom: '1.5rem'}}>
                {!active && touched && error} 
            </div> 
        </div>
    )
}

export default SurveyField