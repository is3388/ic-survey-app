import React from 'react'

const SurveyNew = ({onCancel}) => {
    return (
        <div>
            <h5>Please confirm all entries.</h5>
            <button className='grey darken-1 btn-flat white-text'
                    onClick={onCancel}>
                        Back
                    </button>
        </div>
    )
}

export default SurveyNew