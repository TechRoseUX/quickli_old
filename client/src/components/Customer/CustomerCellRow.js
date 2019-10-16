import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getRealCustomers} from '../../store/actions/customer'
import './customers.css';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../constants/colors';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import { NewDiv } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';
import { getSelectedCustomer } from '../../store/reducers/environment';

const CustomerCellDiv = styled(NewDiv)`
    width: 100%
    height: 80px;
    background: ${Colors.lighterGray};
    border-bottom: 1px solid black;
`

const CellID = styled(NewDiv)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: ${Colors.lightBlue};
    display: inline-block;
    float: left;
    margin-left: 3%;
    margin-top: 15px;
`

const CellInfoLeft = styled(NewDiv)`
    float: left;
    display: inline-block;
    margin-left: 12%;
    margin-top: 10px;
    height: 60px;
    width: 33%;
    text-align: left;
`

const CellInfoRight = styled(CellInfoLeft)`
    margin-left: 6%;
`

class CustomerCellRow extends Component {

  componentDidMount() {
  }

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
}

  openCustomerProfile = () => {
      const { realCustomers, customerid, selectedCustomer, getSelectedCustomer, history } = this.props
      history.push(`/customers/${customerid}`);
    const sc = this.search(customerid, realCustomers);
    getSelectedCustomer(sc);
    console.log(selectedCustomer);
  }

  render() {
      const { customerid, name, phoneNumber1, email } = this.props
      console.log(this.props)
    return (
      <CustomerCellDiv
        onClick={() => {this.openCustomerProfile() }}
      >
          <CellID>
          </CellID>
          <CellInfoLeft>
              <NewDiv
              >
                <Text
                    inline
                    lblue20
                >
                    Customer Name:
                </Text>
                <Text
                    inline
                    padding="0 0 0 15px"
                    dblue16
                    acName
                >
                    {name}
                </Text>
              </NewDiv>

              <NewDiv
                padding="15px 0 0 0"
              >
                <Text
                    inline
                    lblue20
                >
                    Phone #:
                </Text>
                <Text
                    inline
                    padding="0 0 0 15px"
                    dblue16
                    acEmail
                >
                    {phoneNumber1}
                </Text>
              </NewDiv>

          </CellInfoLeft>
          <CellInfoRight>
          <NewDiv>
                <Text
                    inline
                    lblue20
                >
                    Email:
                </Text>
                <Text
                    inline
                    padding="0 0 0 15px"
                    dblue16
                    acEmail
                >
                    {email}
                </Text>
              </NewDiv>

              <NewDiv
                padding="15px 0 0 0"
              >
                <Text
                    inline
                    dblue16
                    borderBottom
                >
                    View More
                </Text>
              </NewDiv>
          </CellInfoRight>
      </CustomerCellDiv>
    );
  }
}

export default withRouter(CustomerCellRow);