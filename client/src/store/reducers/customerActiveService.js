import {GET_ACTIVE_SERVICES} from '../actions/constants'

const customerActiveServiceReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_ACTIVE_SERVICES:
        return payload
      default:
        return state
    }
}

export default customerActiveServiceReducer;