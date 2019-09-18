import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getRealCustomers} from '../../store/actions/customer'
import './customers.css';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { getSelectedCustomer } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import { NewDiv } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';


class CustomerService extends Component {

  componentDidMount() {
  }

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
}

    openServiceCustomer = () => {
        const { history } = this.props
        history.push(`/new-vehicle`);
    }

  render() {
    const realCustomers = this.props.state.realCustomers
    const selectedCustomer = this.props.selectedCustomer

    console.log(realCustomers.length)
    console.log(selectedCustomer);
    console.log(this.props);

    if (realCustomers.length >= 1) {
        return (
            <div>
              <h2>Customer Service</h2>
              <Button onClick={() => this.openServiceCustomer()}>
                  Add Vehicle
              </Button>
            </div>
          );
    } else {
        return (
            <div>
                Loading.....
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  state: state
})

const dispatchToProps = (dispatch) => ({
   getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer))
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(CustomerService));