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
import userw from '../../rersources/svg/userw.svg';
import { NewDiv } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';

const CustomerInfoContainer = styled(NewDiv)`
`

const InfoElement = styled(NewDiv)`
    @media ${device.tablet} {
        margin: 0;
        margin-left: 80px;
        margin-bottom: 50px;
        text-align: left;
    } 
`

const InfoEIcon = styled(NewDiv)`
    @media ${device.tablet} {
        width: 40px;
        height: 40px;
        display: inline-block;

        svg {
            width: 40px;
            height: 40px;
        }
    } 
`

const InfoEText = styled(NewDiv)`
    @media ${device.tablet} {
        display: inline-block;
        margin-left: 50px;
        height: 40px;
        vertical-align: top;
    }
`

const newVehicleArray = []

class CustomerInfo extends Component {

  componentDidMount() {
    const { selectedCustomer, getSelectedCustomer, realCustomers, customerVehicles } = this.props
    const {
        match: { params: { customerid } }
    } = this.props

    const sc = this.search(customerid, realCustomers);

    if (realCustomers.length > 1) {
        getSelectedCustomer(sc);
    } else {
        console.log('error');
    }

     for (var i=0; i < customerVehicles.length; i++) {
        if (customerVehicles[i].ownerid === customerid) {
            newVehicleArray.push(customerVehicles[i])
        }  else {
            console.log('did not match');
        }  
    }

   
    console.log(customerVehicles);
    console.log(newVehicleArray);
}

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
}

    openServiceCustomer = () => {
        const customerid = this.props.selectedCustomer.customerid
        const history = this.props.history;
        history.push(`/customers/service/${customerid}`);
    }

    renderVehicles = () => {
        const vehicles = newVehicleArray
        console.log(vehicles);
        return vehicles.map((v) => {
            return (
                <NewDiv>
                    <Text
                        color="black"
                    >
                        {v.vehicleMake}
                    </Text>
                </NewDiv>
            )
        })
    }

  render() {
    const { realCustomers, selectedCustomer, customerVehicles } = this.props

    console.log(realCustomers.length)
    console.log(selectedCustomer);

    if (realCustomers.length >= 1) {
        return (
            <div>
              <h2>Customer Info</h2>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={userb} />
                  </InfoEIcon>
                  <InfoEText>
                      <Text
                      color='black'
                      customerIE
                      lblue20
                      >
                          {selectedCustomer.name}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={userb} />
                  </InfoEIcon>
                  <InfoEText>
                      <Text
                      color='black'
                      customerIE
                      lblue20
                      >
                          {selectedCustomer.name}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={userb} />
                  </InfoEIcon>
                  <InfoEText>
                      <Text
                      color='black'
                      customerIE
                      lblue20
                      >
                            {selectedCustomer.name}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                {this.renderVehicles()}
              </InfoElement>
              <NewDiv>
                  <Button onClick={() => this.openServiceCustomer()}>
                      Service This Customer
                  </Button>
              </NewDiv>
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

export default withRouter(connect(mapStateToProps, dispatchToProps)(CustomerInfo));