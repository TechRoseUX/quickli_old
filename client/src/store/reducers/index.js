import {combineReducers} from 'redux';
import customerReducer from './customer';
import auth from './auth';
import environment from './environment';
import { reducer as reduxForm } from 'redux-form';
import customerRealReducer from './realCustomer';
import customerVehicleReducer from './customerVehicle';
import customerServiceReducer from './customerService';
import customerActiveServiceReducer from './customerService';
import customerActiveToMessageReducer from './customerToMessage';

export default combineReducers({
  environment: environment,
  customers: customerReducer,
  activeToMessages: customerActiveToMessageReducer,
  realCustomers: customerRealReducer,
  customerVehicles: customerVehicleReducer,
  customerServices: customerServiceReducer,
  activeServices: customerActiveServiceReducer,
  auth: auth,
  form: reduxForm
});
