import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

const SurveyList = () => {

    const surveys = useSelector(state => state.surveys)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSurveys())
    }, [dispatch, surveys])

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
                
                <p className='orange-text'>Yes: {survey.yes} 
                  <button 
                      className='btn white orange-text right' 
                      onClick={()=>onDelete(survey._id)}
                      style={{fontWeight:'bold'}}>
                    Delete
                  </button>
                </p>
                <p className='orange-text'>No: {survey.no}</p>
              </div>
            </div>
          )
        })
      }

      const onDelete = (id) => {
        dispatch(deleteSurvey(id))
      }

    return (
        <div>{renderSurveys()}</div>
    )
}

export default SurveyList