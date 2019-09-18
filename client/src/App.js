import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import mainLogo from './rersources/mainLogo.png';
import './App.css';
import store from './store';
import history from './history';
import Customers from './components/Customer/customers';
import AllCustomers from './components/Customer/AllCustomers';
import CustomerInfo from './components//Customer/CustomerInfo';
import UserLogin from './components/Customer/userLogin';
import AddCustomer from './components/Customer/AddCustomer';
import AddVehicle from './components/Customer/AddVehicle';
import RegisterUser from './components/Customer/RegisterUser';
import LoginUser from './components/Customer/LoginUser';
import StyledNavBar from './components/Customer/Styled/StyledNavBar';
import CustomerService from './components/Customer/CustomerService';
import { connect } from 'react-redux';

import { createNewCustomer, createNewUser, createNewVehicle, userLogin, logoutUser, fetchUser, getRealCustomers, getCustomerVehicles } from './store/actions/customer';
import { toggleNavBar, toggleNavToggle, getSelectedCustomer } from './store/reducers/environment';

import styled from 'styled-components';

import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

const Code = () => {
  return (
    <div>
      Code Code Code
    </div>
  )
}

class App extends Component {

  componentDidMount() {
    const { fetchUser, getRealCustomers, getCustomerVehicles } = this.props;
    getRealCustomers();
    getCustomerVehicles();
    fetchUser();
  }

  renderContent = () => {
    const props = this.props
    const auth = this.props.auth
    const data = props && props.auth ? props.auth.data : null;
    switch (data) {
      case null:
        return 'Still deciding';
      case false:
        return 'Im logged out';
      case '':
        return 'Im logged out';
      default:
        return 'Im logged in';
    }
  }

  render () {
    const createNewCustomer = this.props.createNewCustomer;
    const createNewUser = this.props.createNewUser;
    const createNewVehicle = this.props.createNewVehicle;
    const userLogin = this.props.userLogin;
    const logoutUser = this.props.logoutUser;
    const toggleNavBar = this.props.toggleNavBar;
    const toggleNavToggle = this.props.toggleNavToggle;
    const getSelectedCustomer = this.props.getSelectedCustomer;
    const environment = this.props.environment;
    const realCustomers = this.props.state.realCustomers;
    const customerVehicles = this.props.state.customerVehicles;
;
    console.log(this.props);
    console.log(this.props.environment);
    console.log(realCustomers);
    console.log(customerVehicles);

    return (
          <div className="App">
            <StyledNavBar
              renderContent={this.renderContent} 
              toggleNavBar={toggleNavBar}
              toggleNavToggle={toggleNavToggle}
              fetchUser={fetchUser}
              showNavBar={environment.showNavBar}
              showNavToggle={environment.showNavToggle}
            />
            <Route exact path="/" 
            render={(props) => <LoginUser
            userLogin={userLogin}
            logoutUser={logoutUser}
             />  }
             />
            <Route exact path="/login" 
            render={(props) => <LoginUser
            userLogin={userLogin}
            logoutUser={logoutUser}
             />  }
             />
            <Route exact path="/register" 
            render={(props) => <RegisterUser
            createNewUser={createNewUser}
             />  }
             />
            <Route exact path="/new-customer" 
            render={(props) => <AddCustomer
            createNewCustomer={createNewCustomer}
             />  }
             />
             <Route exact path="/new-vehicle" 
            render={(props) => <AddVehicle
            createNewVehicle={createNewVehicle}
            selectedCustomer={environment.selectedCustomer}
             />  }
             />
            <Route exact path="/current-vehicles" component={Code} />
            <Route exact path="/all-customers" 
            render={(props) => <AllCustomers
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              history={history}
    
             />  }
             />
             <Route exact path="/customers/:customerid" 
              render={(props) => <CustomerInfo
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              realCustomers={realCustomers}
              customerVehicles={customerVehicles}
    
             />  }
             />
             <Route exact path="/customers/service/:customerid" 
              render={(props) => <CustomerService
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              realCustomers={realCustomers}
              history={history}
    
             />  }
             />
            <Route exact path="/settings" component={Code} />
            <Route exact path="/logout" component={Code} logoutUser={logoutUser} />
          </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
            auth: state.auth,
            environment: state.environment,
            state: state
          }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCustomer: (values) => dispatch(createNewCustomer(values)),
    createNewUser: (values) => dispatch(createNewUser(values)),
    createNewVehicle: (values) => dispatch(createNewVehicle(values)),
    userLogin: (values) => dispatch(userLogin(values)),
    logoutUser: (values) => dispatch(logoutUser(values)),
    fetchUser: (values) => dispatch(fetchUser(values)),
    toggleNavBar: (display) => dispatch(toggleNavBar(display)),
    toggleNavToggle: (display) => dispatch(toggleNavToggle(display)),
    getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer)),
    getRealCustomers: () => dispatch(getRealCustomers()),
    getCustomerVehicles: () => dispatch(getCustomerVehicles())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
