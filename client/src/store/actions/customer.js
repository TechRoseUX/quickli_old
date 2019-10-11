import axios from 'axios';
import {GET_CUSTOMERS, UPDATE_CUSTOMER, GET_REAL_CUSTOMERS, FETCH_USER, GET_VEHICLES, GET_SERVICES, GET_ACTIVE_SERVICES, GET_ACTIVE_TO_MESSAGES} from './constants';

export const getCustomers = () => dispatch => {
  return fetch('/api/customers')
    .then(res => res.json())
    .then(customers => dispatch({type: GET_CUSTOMERS, payload: customers}))
}

export const getRealCustomers = () => dispatch => {
  return fetch('/all-customers')
    .then(res => res.json())
    .then(realCustomers => dispatch({type: GET_REAL_CUSTOMERS, payload: realCustomers}))
}

export const getCustomerVehicles = () => dispatch => {
  return fetch('/customer-vehicles')
  .then(res => res.json())
  .then(customerVehicles => dispatch({type: GET_VEHICLES, payload: customerVehicles}))
}

export const getCustomerServices = () => dispatch => {
  return fetch('/customer/vehicles-services')
  .then(res => res.json())
  .then(customerServices => dispatch({type: GET_SERVICES, payload: customerServices}))
}

export const getActiveCustomerServices = () => dispatch => {
  return fetch('/customers/chat/service')
  .then(res => res.json())
  .then(customerActiveServices => dispatch({type: GET_ACTIVE_SERVICES, payload: customerActiveServices}))
}

export const getCustomerActiveToMessages = () => dispatch => {
  return fetch('/customers/chat/service/messages')
  .then(res => res.json())
  .then(activeToMessages => dispatch({type: GET_ACTIVE_TO_MESSAGES, payload: activeToMessages}))
}

export const createNewCustomer = (values) => async dispatch => {
  const res = await axios.post('/new-customer', values);
  console.log('Here is the new customer nfndfnsdfnskdhfkshdf')
  dispatch({type: GET_CUSTOMERS, payload: res.data});
  window.location.reload();
}

export const createNewVehicle = (dataa) => async dispatch => {
  console.log('sending new vehicle to database......')
  const res = await axios.post('/new-vehicle/:customerid', dataa);
  dispatch({type: GET_CUSTOMERS, payload: res.data});
}

export const createNewUser = (values) => async dispatch => {
  const res = await axios.post('/register', values);
  console.log('Here is the new user being added.')
  dispatch({type: UPDATE_CUSTOMER, payload: res.data})
}

export const createNewService = (dataa) => async dispatch => {
  const res = await axios.post('/customers/service/:customerid/:serviceid', dataa);
  dispatch({type: GET_CUSTOMERS, payload: res.data})
}

export const updateService = (dataa) => async dispatch => {
  const res = await axios.post('/end-service', dataa);
  console.log('Updating the service!')
  dispatch({type: GET_CUSTOMERS, payload: res.data})
}

export const createNewToMessage = (value) => async dispatch => {
  console.log(value)
  const res = await axios.post('/customers/chat/service', value);
  dispatch({type: GET_CUSTOMERS, payload: res.data})
}

export const userLogin = (values) => async dispatch => {
  const reload = () => {
    window.location.reload()
  }
  setTimeout(reload, 5000)
  const res = await axios.post('/login', values);
  console.log('Here is the new user being logged in.')
  dispatch({type: UPDATE_CUSTOMER, payload: res.data})
}

export const logoutUser = () => dispatch => {
  return fetch('/logout')
  .then(res => res.json())
    .then(customers => dispatch({type: GET_CUSTOMERS, payload: customers}))
};

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/current_user')
    dispatch({ type: FETCH_USER, payload: res });
}
