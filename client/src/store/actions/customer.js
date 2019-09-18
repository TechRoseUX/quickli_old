import axios from 'axios';
import {GET_CUSTOMERS, UPDATE_CUSTOMER, GET_REAL_CUSTOMERS, FETCH_USER, GET_VEHICLES} from './constants';

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

export const createNewCustomer = (values) => async dispatch => {
  const res = await axios.post('/new-customer', values);
  console.log('Here is the new customer nfndfnsdfnskdhfkshdf')
  dispatch({type: GET_CUSTOMERS, payload: res.data})
}

export const createNewVehicle = (dataa) => async dispatch => {
  const res = await axios.post('/new-vehicle', dataa);
  console.log('Here is the new vehicle yeysadkhkajhsd')
  dispatch({type: GET_CUSTOMERS, payload: res.data})
}

export const createNewUser = (values) => async dispatch => {
  const res = await axios.post('/register', values);
  console.log('Here is the new user being added.')
  dispatch({type: UPDATE_CUSTOMER, payload: res.data})
}

export const userLogin = (values) => async dispatch => {
  const res = await axios.post('/login', values);
  console.log('Here is the new user being logged in.')
  dispatch({type: UPDATE_CUSTOMER, payload: res.data})
}

export const logoutUser = () => dispatch => {
  return fetch('/logout');
};

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/current_user')
    dispatch({ type: FETCH_USER, payload: res });
}
