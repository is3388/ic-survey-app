/*export default function (state={}, action) {
    switch (action.type) {
        default: 
            return state
    }
}*/

//import { FETCH_USER, LOGOUT_USER } from "../actions/types"
import { FETCH_USER } from "../actions/types"

// null meaning don't know if user is logged in or not. Request is pending.
// returns either null or false (not logged in) or user model contains googleId
const authReducer = (state=null, action) => {
    console.log(action)
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false
        // case LOGOUT_USER: 
           // return false
        default: 
            return state
    }
}

export default authReducer