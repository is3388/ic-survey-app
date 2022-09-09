import { FETCH_SURVEYS, DELETE_SURVEY } from "../actions/types"

const surveysReducer = (state=[], action) => {
    switch(action.type) {
        case FETCH_SURVEYS:
            return action.payload
        case DELETE_SURVEY:
            return state.filter(({id}) => id !== action.payload)
        default:
            return state
    }
} 

/*const initial_state = {surveys : [], success:false}
const surveysReducer = (state=initial_state, action) => {
    switch(action.type) {
        case FETCH_SURVEYS:
            return { surveys: action.payload, success: true }
        case DELETE_SURVEY:
            return { ...state, success: true }
        default:
            return state
    }
} */

export default surveysReducer