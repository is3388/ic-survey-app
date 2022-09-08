import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSurveys } from '../../actions'

const SurveyList = () => {

    const surveys = useSelector(state => state.surveys)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSurveys())
    }, [dispatch])

    const renderSurveys = () => {
        return surveys.map(survey => {
          return (
            <div className="card grey darken-1" key={survey._id}>
              <div className="card-content white-text">
                <span className="card-title">{survey.title}</span>
                <p>
                  {survey.body}
                </p>
                <p className="right">
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <p className='orange-text'>Yes: {survey.yes}</p>
                <p className='orange-text'>No: {survey.no}</p>
              </div>
            </div>
          )
        })
      }


    return (
        <div>{renderSurveys()}</div>
    )
}

export default SurveyList