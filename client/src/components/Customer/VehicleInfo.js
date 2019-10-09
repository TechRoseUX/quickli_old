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
import { getSelectedCustomer, getSelectedService } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import userw from '../../rersources/svg/userw.svg';
import phonew from '../../rersources/svg/phonew.svg';
import mailw from '../../rersources/svg/mailw.svg';
import carw from '../../rersources/svg/carw.svg';
import vinw from '../../rersources/svg/vinw.svg';
import licensew from '../../rersources/svg/licensew.svg';
import calendarw from '../../rersources/svg/calendarw.svg';
import historyw from '../../rersources/svg/historyw.svg';
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

class VehicleInfo extends Component {
  componentDidMount() {
    const { getSelectedVehicle, customerVehicles, customerServices, selectedVehicle } = this.props
    const {
        match: { params: { vehicleid } }
    } = this.props

    const sc = this.search(vehicleid, customerServices);

    if (customerServices.length > 1) {
   //     getSelectedVehicle(sc);
        console.log('selecteing customer')
    } else {
        console.log('error');
    }
}

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].vehicleid === id) {
            return myArray[i];
        }
    }
}

    openServiceScreen = () => {
        const { getSelectedVehicle, selectedVehicle, history } = this.props
        const customerid = selectedVehicle.ownerid
        history.push(`/customers/service/${customerid}`);
    }

    openServiceDetails = (v) => {
        const { history, getSelectedService } = this.props
        const vehicleid = v.vehicleid
        const serviceid = v.serviceid
        history.push(`/customers/vehicles/${vehicleid}/${serviceid}`);
        getSelectedService(v);
      console.log(v);
      console.log(getSelectedService);
    }

    renderServices = () => {
        const { getSelectedVehicle, customerVehicles, customerServices, selectedVehicle } = this.props
        const newServiceArray = []

        for (var i=0; i < customerServices.length; i++) {
            if (customerServices[i].vehicleid === selectedVehicle.vehicleid) {
                newServiceArray.push(customerServices[i]);
                console.log('Pushed');
            }  else {
                console.log('did not match');
            }  
        }

       const services = newServiceArray
         console.log(services.length);
        return services.map((v) => {
            return (
                <NewDiv>
                    <Text
                        white20
                        padding="20px 0 5px 0"
                        onClick={() => this.openServiceDetails(v)}
                    >
                        Service - {v.vehicleid}
                    </Text>
                </NewDiv>
            )
        })
    }

    goBack() {
        const { history } = this.props
        history.go(-1)
      }

  render() {
    const { selectedVehicle, selectedCustomer } = this.props

    if (selectedVehicle) {
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
                  Vehicle Info
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
                          OWNER:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.ownerid}
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
                          {selectedVehicle.phoneNumber1}
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
                          {selectedVehicle.phoneNumber2}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={calendarw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          YEAR:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.vehicleYear}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={carw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          MAKE:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.vehicleMake}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={carw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          MODEL:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.vehicleModel}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={licensew} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          LICENSE #:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.vehicleLicenseNumber}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={vinw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          VIN #:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedVehicle.vehicleVinNumber}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
              <InfoEIcon>
                      <SVG src={vinw} />
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
                    onClick={() => this.openServiceScreen()}
                  >
                    <Text
                      white20
                    >
                      Service This Vehicle
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
   getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer)),
   getSelectedService: (service) => dispatch(getSelectedService(service))
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(VehicleInfo));