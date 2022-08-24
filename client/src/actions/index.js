import axios from 'axios'
import { FETCH_USER } from './types'

const fetchUser = () => {
   // using redux thunk returns a function with dispatch from redux store instead of returns JS object with action type and payload
   // dispatch the action after response get back and forward to all reducers
   return function (dispatch) {
    axios.get('/auth/api/current_user') 
      .then( res => dispatch({ type: FETCH_USER, payload: res}))
    }
}