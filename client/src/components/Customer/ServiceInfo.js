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
import detailsw from '../../rersources/svg/detailsw.svg';
import mileagew from '../../rersources/svg/mileagew.svg';
import pencilw from '../../rersources/svg/pencilw.svg';
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
        max-width: 350px;
    }
`

class ServiceInfo extends Component {
  componentDidMount() {
    const { realCustomers } = this.props

    if (!realCustomers || realCustomers.length < 1) {
        setTimeout(this.getCustomerFromParams, 3000)
    } else {
        console.log('There is something')
        console.log(realCustomers)
    }
}

getCustomerFromParams = () => {
    const { getSelectedVehicle, getSelectedCustomer, getSelectedService, customerVehicles, customerServices, selectedVehicle, realCustomers } = this.props
    const {
        match: { params: { vehicleid } }
    } = this.props

    const {
        match: { params: { customerid } }
    } = this.props

    const {
        match: { params: { serviceid } }
    } = this.props

    const sv = this.searchV(vehicleid, customerVehicles);
    const sc = this.searchC(customerid, realCustomers);
    const ss = this.searchS(serviceid, customerServices)

    console.log(sv)
    console.log(ss)
    console.log(sc)

    getSelectedVehicle(sv)
    getSelectedCustomer(sc)
    getSelectedService(ss)
}

  searchV = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].vehicleid === id) {
            return myArray[i];
        }
    }
}

searchC = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
}

searchS = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].serviceid === id) {
            return myArray[i];
        }
    }
}

    goBack() {
        const { history } = this.props
        history.go(-1)
    }

  render() {
    const { selectedVehicle, selectedCustomer, selectedService } = this.props
    console.log(this.props.state);
    var strTime;
    var strDate;

    if (selectedService) {
        var jsTime = selectedService.date
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
      //  strDate = (`${fMonth}/${fDay}`);

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
                  Service Info
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
                          CUSTOMER NAME
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedService.customerName}
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
                          DATE:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {formattedDate}
                          &nbsp;
                          - 
                          &nbsp;
                          {formattedTime} 
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
                          {selectedService.phoneNumber}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={mileagew} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          MILEAGE:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedService.mileage}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={pencilw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          REASON FOR VISIT:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedService.reason}
                      </Text>
                  </InfoEText>
              </InfoElement>
              <InfoElement>
                  <InfoEIcon>
                      <SVG src={detailsw} />
                  </InfoEIcon>
                  <InfoEText
                    width="250px"
                    marginLeft="50px"
                  >
                      <Text
                      customerIE
                      dblue22
                      >
                          DETAILS:
                      </Text>
                  </InfoEText>
                  <InfoEText>
                      <Text
                      customerIE
                      white20
                      >
                          {selectedService.details}
                      </Text>
                  </InfoEText>
              </InfoElement>
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

export default withRouter(connect(mapStateToProps, dispatchToProps)(ServiceInfo));