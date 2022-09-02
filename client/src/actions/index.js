import axios from 'axios'
import { FETCH_USER } from './types'
//import { FETCH_USER, LOGOUT_USER } from './types'

export const fetchUser = () => 
   // using redux thunk returns a function with dispatch from redux store instead of returns JS object with action type and payload
   // dispatch the action after response get back and forward to all reducers
    async (dispatch) => {
    const {data} = await axios.get('/auth/api/current_user') 
      dispatch({ type: FETCH_USER, payload: data})
    }

    export const handleToken = (token) => 
    // make a post request to backend server with token that after Stripe send it back
    // since FETCH_USER action returns the user model with updated credits, reuse this action type
     async (dispatch) => {
     const {data} = await axios.post('/api/stripe', token) 
       dispatch({ type: FETCH_USER, payload: data})
     }

     export const submitSurvey = (values, history) => 
      async (dispatch) => {
        const {data} = await axios.post('/api/surveys', values) 
        history.push('/surveys') // redirect to Dashboard
          dispatch({ type: FETCH_USER, payload: data})
      }
     
 /*export const logoutUser = () => async dispatch => {
    const res = await axios.get('/api/logout')
    dispatch({ type: LOGOUT_USER, payload: res.data});
}*/
