import { FETCH_SURVEYS, DELETE_SURVEY } from "../actions/types"

const surveysReducer = (state=[], action) => {
    switch(action.type) {
        case FETCH_SURVEYS:
            return action.payload
        case DELETE_SURVEY:
            return [...state]
        default:
            return state
    }
}

export default surveysReducer