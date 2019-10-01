import {GET_SERVICES} from '../actions/constants'

const customerServiceReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_SERVICES:
        return payload
      default:
        return state
    }
}

export default customerServiceReducer;