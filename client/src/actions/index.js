import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => 
   // using redux thunk returns a function with dispatch from redux store instead of returns JS object with action type and payload
   // dispatch the action after response get back and forward to all reducers
    async (dispatch) => {
    const {data} = await axios.get('/auth/api/current_user') 
      dispatch({ type: FETCH_USER, payload: data})
    }
