import React from 'react'

// {input} from props.input that reduxForm passes props to component
// input object has lots of even handlers attached to it
// reduxForm wire up eventhandlers like onChange, onBlur, onFocus
const SurveyField = ({input, label}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} /> {/* passing whatever input properties are */}
        </div>
    )
}

export default SurveyField