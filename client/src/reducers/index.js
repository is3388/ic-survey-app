import { combineReducers } from "redux"
import authReducer from './authReducer'
import { reducer as reduxForm } from 'redux-form' // rename the built-in reducer to reduxForm

export default combineReducers({
    auth: authReducer,
    form: reduxForm
})