import {GET_REAL_CUSTOMERS} from '../actions/constants'

const customerRealReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_REAL_CUSTOMERS:
        return payload
      default:
        return state
    }
}

export default customerRealReducer;