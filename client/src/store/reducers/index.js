import {combineReducers} from 'redux';
import customerReducer from './customer';
import auth from './auth';
import environment from './environment';
import { reducer as reduxForm } from 'redux-form';
import customerRealReducer from './realCustomer';
import customerVehicleReducer from './customerVehicle';

export default combineReducers({
  environment: environment,
  customers: customerReducer,
  realCustomers: customerRealReducer,
  customerVehicles: customerVehicleReducer,
  auth: auth,
  form: reduxForm
});
