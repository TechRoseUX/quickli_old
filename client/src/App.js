import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import mainLogo from './rersources/mainLogo.png';
import './App.css';
import store from './store';
import history from './history';
import Customers from './components/Customer/customers';
import ChatMessenger from './components/Customer/ChatMessenger';
import AllCustomers from './components/Customer/AllCustomers';
import CustomerInfo from './components/Customer/CustomerInfo';
import VehicleInfo from './components/Customer/VehicleInfo';
import ServiceInfo from './components/Customer/ServiceInfo';
import CustomerConfirmation from './components/Customer/CustomerConfirmation';
import VehicleConfirmation from './components/Customer/VehicleConfirmation';
import UserLogin from './components/Customer/userLogin';
import AddCustomer from './components/Customer/AddCustomer';
import AddService from './components/Customer/AddService';
import AddVehicle from './components/Customer/AddVehicle';
import RegisterUser from './components/Customer/RegisterUser';
import LoginUser from './components/Customer/LoginUser';
import StyledNavBar from './components/Customer/Styled/StyledNavBar';
import CustomerService from './components/Customer/CustomerService';
import { connect } from 'react-redux';

import { createNewCustomer, createNewUser, createNewVehicle, userLogin, logoutUser, fetchUser, getRealCustomers, getCustomerVehicles, createNewService, getCustomerServices, createNewToMessage, getCustomerActiveToMessages } from './store/actions/customer';
import { toggleNavBar, toggleNavToggle, getSelectedCustomer, getSelectedVehicle, getCurrentEmailId } from './store/reducers/environment';

import styled from 'styled-components';

import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom';
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
    const { fetchUser, getRealCustomers, getCustomerVehicles, getCustomerServices, getCustomerActiveToMessages } = this.props;
    getRealCustomers();
    getCustomerVehicles();
    getCustomerServices();
    fetchUser();
    getCustomerActiveToMessages();
  }

  renderContent = () => {
    const props = this.props
    const auth = this.props.auth
    const data = props && props.auth ? props.auth.data : null;
    switch (data) {
      case null:
        return 'Still deciding';
      case false:
        return 'Login';
      case '':
        return 'Login';
      default:
        return 'Logout';
    }
  }

  renderCorrectPage = () => {
    const props = this.props
    const auth = this.props.auth
    const data = props && props.auth ? props.auth.data: null

    const userLogin = this.props.userLogin;
    const logoutUser = this.props.logoutUser;
    const getSelectedCustomer = this.props.getSelectedCustomer;
    const environment = this.props.environment;

    switch (data) {
      case null:
        console.log('null');
        return (
          <LoginUser
           userLogin={userLogin}
            logoutUser={logoutUser}
          />
        )
      case false:
          console.log('false');
          return (
            <LoginUser
              userLogin={userLogin}
              logoutUser={logoutUser}
              history={history}
           />
        )
      case '':
          console.log('empty');
          return (
            <LoginUser
              userLogin={userLogin}
              logoutUser={logoutUser}
              history={history}
           />
        )
      default:
          console.log('default');
        return (
            <AllCustomers
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              history={history}
             />
        )

    }
  }

  render () {
    const createNewCustomer = this.props.createNewCustomer;
    const createNewUser = this.props.createNewUser;
    const createNewVehicle = this.props.createNewVehicle;
    const createNewService = this.props.createNewService;
    const createNewToMessage = this.props.createNewToMessage;
    const userLogin = this.props.userLogin;
    const logoutUser = this.props.logoutUser;
    const toggleNavBar = this.props.toggleNavBar;
    const toggleNavToggle = this.props.toggleNavToggle;
    const getSelectedCustomer = this.props.getSelectedCustomer;
    const getSelectedVehicle = this.props.getSelectedVehicle;
    const getCurrentEmailId = this.props.getCurrentEmailId
    const environment = this.props.environment;
    const realCustomers = this.props.state.realCustomers;
    const customerVehicles = this.props.state.customerVehicles;
    const customerServices = this.props.state.customerServices;
    const activeToMessages = this.props.state.activeToMessages;
    const auth = this.props.auth;
;
    console.log(this.props);
    console.log(this.props.environment);
    console.log(realCustomers);
    console.log(customerVehicles);
    console.log(customerServices);
    console.log(activeToMessages)

    return (
          <div className="App">
            <StyledNavBar
              renderContent={this.renderContent} 
              toggleNavBar={toggleNavBar}
              toggleNavToggle={toggleNavToggle}
              fetchUser={fetchUser}
              showNavBar={environment.showNavBar}
              showNavToggle={environment.showNavToggle}
              logoutUser={logoutUser}
              history={history}
              auth={auth}
            />
            <Switch>
            <Route exact path="/" 
            render={(props) => 
            <div>
                {this.renderCorrectPage()}
              </div>
                }
             />
            <Route exact path="/login" 
            render={(props) => <div>
              {this.renderCorrectPage()}
            </div> }
            history={history}
             />
            <Route exact path="/register" 
            render={(props) => <RegisterUser
            createNewUser={createNewUser}
            history={history}
             />  }
             />
            <Route exact path="/new-customer" 
            render={(props) => <AddCustomer
            createNewCustomer={createNewCustomer}
            toggleNavBar={toggleNavBar}
            toggleNavToggle={toggleNavToggle}
            showNavBar={environment.showNavBar}
            history={history}
            realCustomers={realCustomers}
            selectedCustomer={environment.selectedCustomer}
            getSelectedCustomer={getSelectedCustomer}
            getCurrentEmailId={getCurrentEmailId}
             />  }
             />
             <Route exact path="/new-vehicle" 
            render={(props) => <AddVehicle
            createNewVehicle={createNewVehicle}
            selectedCustomer={environment.selectedCustomer}
            getSelectedCustomer={getSelectedCustomer}
            history={history}
             />  }
             />
             <Route exact path="/new-service" 
            render={(props) => <AddService
            createNewService={createNewService}
            selectedCustomer={environment.selectedCustomer}
            selectedVehicle={environment.selectedVehicle}
            history={history}
             />  }
             />
             <Route exact path="/new-customer/confirmation" 
            render={(props) => <CustomerConfirmation
            selectedCustomer={environment.selectedCustomer}
            getSelectedCustomer={getSelectedCustomer}
            realCustomers={realCustomers}
            history={history}
             />  }
             />

            <Route exact path="/new-vehicle/confirmation" 
            render={(props) => <VehicleConfirmation
            selectedCustomer={environment.selectedCustomer}
            selectedVehicle={environment.selectedVehicle}
            getSelectedCustomer={getSelectedCustomer}
            realCustomers={realCustomers}
            customerVehicles={customerVehicles}
            getSelectedVehicle={getSelectedVehicle}
            history={history}
             />  }
             />

            <Route exact path="/all-customers" 
            render={(props) => <AllCustomers
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              history={history}
              toggleNavBar={toggleNavBar}
              toggleNavToggle={toggleNavToggle}
              showNavBar={environment.showNavBar}
    
             />  }
             />
             <Route exact path="/customers/:customerid" 
              render={(props) => <CustomerInfo
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              getSelectedVehicle={getSelectedVehicle}
              selectedVehicle={environment.selectedVehicle}
              history={history}
              selectedCustomer={environment.selectedCustomer}
              realCustomers={realCustomers}
              customerVehicles={customerVehicles}
    
             />  }
             />
             <Route exact path="/customers/vehicles/:vehicle" 
              render={(props) => <VehicleInfo
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              getSelectedVehicle={getSelectedVehicle}
              selectedVehicle={environment.selectedVehicle}
              history={history}
              selectedCustomer={environment.selectedCustomer}
              realCustomers={realCustomers}
              customerVehicles={customerVehicles}
              customerServices={customerServices}
    
             />  }
             />
             <Route exact path="/customers/vehicles/:vehicleid/:serviceid" 
              render={(props) => <ServiceInfo
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              getSelectedVehicle={getSelectedVehicle}
              selectedVehicle={environment.selectedVehicle}
              history={history}
              selectedCustomer={environment.selectedCustomer}
              realCustomers={realCustomers}
              customerVehicles={customerVehicles}
              customerServices={customerServices}
              selectedService={environment.selectedService}
    
             />  }
             />
             <Route exact path="/customers/service/:customerid" 
              render={(props) => <AddService
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              selectedVehicle={environment.selectedVehicle}
              realCustomers={realCustomers}
              history={history}
              createNewService={createNewService}
    
             />  }
             />
             <Route exact path="/customers/chat/service" 
              render={(props) => <ChatMessenger
              {...props}
              getSelectedCustomer={getSelectedCustomer}
              selectedCustomer={environment.selectedCustomer}
              selectedVehicle={environment.selectedVehicle}
              realCustomers={realCustomers}
              history={history}
              customerServices={customerServices}
              createNewToMessage={createNewToMessage}
              activeToMessages={activeToMessages}
              toggleNavBar={toggleNavBar}
              toggleNavToggle={toggleNavToggle}
              showNavBar={environment.showNavBar}
    
             />  }
             />
            <Route exact path="/settings" component={Code} />
            <Route exact path="/logout" component={Code} logoutUser={logoutUser} />
            </Switch>
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
    createNewService: (values) => dispatch(createNewService(values)),
    createNewToMessage: (value) => dispatch(createNewToMessage(value)),
    userLogin: (values) => dispatch(userLogin(values)),
    logoutUser: (values) => dispatch(logoutUser(values)),
    fetchUser: (values) => dispatch(fetchUser(values)),
    toggleNavBar: (display) => dispatch(toggleNavBar(display)),
    toggleNavToggle: (display) => dispatch(toggleNavToggle(display)),
    getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer)),
    getSelectedVehicle: (vehicle) => dispatch(getSelectedVehicle(vehicle)),
    getCurrentEmailId: (email) => dispatch(getCurrentEmailId(email)),
    getRealCustomers: () => dispatch(getRealCustomers()),
    getCustomerVehicles: () => dispatch(getCustomerVehicles()),
    getCustomerServices: () => dispatch(getCustomerServices()),
    getCustomerActiveToMessages: () => dispatch(getCustomerActiveToMessages())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
