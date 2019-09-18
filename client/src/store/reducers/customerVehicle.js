import {GET_VEHICLES} from '../actions/constants'

const customerVehicleReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_VEHICLES:
        return payload
      default:
        return state
    }
}

export default customerVehicleReducer;