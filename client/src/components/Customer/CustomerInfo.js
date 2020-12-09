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
import { getSelectedCustomer } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import userw from '../../rersources/svg/userw.svg';
import phonew from '../../rersources/svg/phonew.svg';
import mailw from '../../rersources/svg/mailw.svg';
import servicew from '../../rersources/svg/servicew.svg';
import carw from '../../rersources/svg/carw.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import StyledBackIcon from './Styled/StyledBackIcon';
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
    
    @media ${device.laptop} {
        margin-left: 10%;
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
        height: ${props => (props.height || '40px')};
        width: ${props => (props.width || 'auto')}
        margin-left: ${props => (props.marginLeft || '0px')};
        vertical-align: top;
    }
`

class CustomerInfo extends Component {
  componentDidMount() {
    const { selectedCustomer, getSelectedCustomer, realCustomers, customerVehicles, getRealCustomers } = this.props

    if (!realCustomers || realCustomers.length < 1) {
        getRealCustomers()
        setTimeout(this.getCustomerFromParams, 7000)
    } else {
        console.log('There is something')
        console.log(realCustomers)
    }
}

getCustomerFromParams = () => {
    const { realCustomers, selectedCustomer, getSelectedCustomer } = this.props
    const {
        match: { params: { customerid } }
    } = this.props

    console.log(realCustomers)
    const sc = this.search(customerid, realCustomers);
    console.log(sc)
    getSelectedCustomer(sc);
}

consoleLog = () => {
}

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
}
    openNewVehicle = () => {
        const customerid = this.props.selectedCustomer.customerid
        const history = this.props.history;
        history.push(`/new-vehicle/${customerid}`);
    }

    openVehicleDetails = (v) => {
        const { getSelectedVehicle, selectedVehicle, history, selectedCustomer } = this.props
        const vehicleid = v.vehicleid
        console.log(selectedCustomer)
        getSelectedVehicle(v)
        console.log(selectedVehicle)
        const customerid = selectedCustomer.customerid
        history.push(`/customers/vehicles/${customerid}/${vehicleid}`);
   //   const sc = this.search(customerid, realCustomers);
   //   getSelectedCustomer(sc);
      console.log(v);
    }

    openServiceScreen = () => {
        const { getSelectedVehicle, selectedVehicle, history } = this.props
        const vehicleid = selectedVehicle.vehicleid
        const customerid = selectedVehicle.ownerid
        history.push(`/customers/service/${customerid}/1`);
    }


    renderServices = () => {
        const { getSelectedVehicle, customerVehicles, customerServices, selectedVehicle, selectedCustomer } = this.props
        const newServiceArray = []

        for (var i=0; i < customerServices.length; i++) {
            if (customerServices[i].customerid === selectedCustomer.customerid) {
                newServiceArray.push(customerServices[i]);
                console.log('Pushed');
            }  else {
                console.log('did not match');
            }  
        }

       const services = newServiceArray
         console.log(services.length);
        return services.map((v) => {
        var jsTime = v.date
        var timestamp = jsTime.substring(0, jsTime.length - 3)
        console.log(timestamp);
        console.log(jsTime);
        var newDate = new Date(timestamp*1000);
        var fHours = newDate.getHours();
        var fMinutes = '0' + newDate.getMinutes();

        var fDay = newDate.getDate();
        var fMonth = newDate.getMonth();
        var fYear = newDate.getFullYear();
        fMonth = fMonth + 1;
        console.log(fMonth);
        console.log(fDay);
        
        var ampm = fHours >= 12 ? 'pm' : 'am';
        fHours = fHours % 12;
        fHours = fHours ? fHours : 12;
      //  fMinutes = fMinutes < 10 ? '0'+ fMinutes : fMinutes;
      var formattedTime = fHours + ':' + fMinutes.substr(-2) + ampm;
      var formattedDate = (`${fMonth}/${fDay}/${fYear}`)

            return (
                <NewDiv>
                    <Text
                        white20
                        padding="20px 0 5px 0"
                        onClick={() => this.openServiceDetails(v)}
                    >
                        Service - {formattedDate}
                    </Text>
                </NewDiv>
            )
        })
    }

    

    renderVehicles = () => {
        const { customerVehicles, selectedCustomer } = this.props
        const customerid = this.props.selectedCustomer.customerid
        const newVehicleArray =[]
         for (var i=0; i < customerVehicles.length; i++) {
            if (customerVehicles[i].ownerid === customerid) {
                newVehicleArray.push(customerVehicles[i])
            }  else {
                console.log('did not match');
            }  
        }

        console.log(this.props);
        console.log(customerVehicles);
        console.log(newVehicleArray);
        const vehicles = newVehicleArray
        console.log(vehicles);
        return vehicles.map((v) => {
            console.log(v);
            return (
                <NewDiv>
                    <Text
                        dblue22
                        borderBottom
                        padding="20px 0 5px 0"
                        color={Colors.lightBlue}
                        onClick={() => this.openVehicleDetails(v)}
                    >
                        {v.vehicleMake} {v.vehicleModel}
                    </Text>
                </NewDiv>
            )
        })
    }

    goBack() {
        const { history } = this.props
        history.go(-1)
    }

    historyAndReload = () => {
        const { history } = this.props
        history.push('/login');
        window.location.reload()
      }
    
    renderNotLoggedIn = () => {
        return (
            <div>
                <MainBG>
                    <Text
                    white35
                    padding='100px 0 50px 0'
                    maxWidth='600px'
                    margin='0 auto'
                    >
                    You are not logged in. Please click the button below to return to the login screen.
                    </Text>
                <Button
                    standardBtn
                    margin='0 auto'
                    onClick={this.historyAndReload}
                >
                    <Text
                    buttonText
                    >
                    Login
                    </Text>

                </Button>
                </MainBG>
            </div>
        )
    }

  render() {
    const { realCustomers, selectedCustomer, customerVehicles } = this.props
    var twonum;
    if (selectedCustomer) {
        if (selectedCustomer.phoneNumber2) {
            twonum = selectedCustomer.phoneNumber2
        } else {
            twonum = 'No secondary phone number'
        }
    }

    const props = this.props
    const data = props && props.auth ? props.auth.data : null;

    if (selectedCustomer && data) {
        return (
            <MainBG>
                <StyledBackIcon
                    onClick={() => this.goBack()}
                >
                    <SVG src={arrowleftw} />
                </StyledBackIcon>
             <MainHeading>
                <Text
                  mainHeading
                  padding="30px 0 50px 0"
                >
                  Customer Info
                </Text>
              </MainHeading>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={userw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                         CUSTOMER NAME:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedCustomer.name}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={phonew} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          PHONE NUMBER:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedCustomer.phoneNumber1}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={phonew} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          PHONE NUMBER 2:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {twonum}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={mailw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          EMAIL:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedCustomer.email}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
              <InfoEIcon>
                      <SVG src={carw} />
                  </InfoEIcon>
                  <InfoEText
                    height="auto"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                            VEHICLES:
                      </Text>
                      {this.renderVehicles()}
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                <InfoEIcon>
                      <SVG src={servicew} />
                  </InfoEIcon>
                  <InfoEText
                    height="auto"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                            Service History
                      </Text>
                      {this.renderServices()}
                  </InfoEText>
              </InfoElement>
              <NewDiv
                margin="0 auto"
                width="100%"
              >
                  <Button
                    largeBtn
                    margin="0 auto"
                    backgroundColor={Colors.darkBlue}
                    onClick={() => this.openNewVehicle()}
                  >
                    <Text
                      white20
                    >
                      Add New Vehicle
                    </Text>
                  </Button>
              </NewDiv>
              <NewDiv
                margin="0 auto"
                width="100%"
              >
                  <Button
                    largeBtn
                    margin="0 auto"
                    backgroundColor={Colors.darkBlue}
                    onClick={() => this.openServiceScreen()}
                  >
                    <Text
                      white20
                    >
                      Add New Service
                    </Text>
                  </Button>
              </NewDiv>
            </MainBG>
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
   getRealCustomers: () => dispatch(getRealCustomers())
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(CustomerInfo));