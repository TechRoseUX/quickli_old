import {GET_ACTIVE_TO_MESSAGES} from '../actions/constants'

const customerActiveToMessageReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_ACTIVE_TO_MESSAGES:
        return payload
      default:
        return state
    }
}

export default customerActiveToMessageReducer;