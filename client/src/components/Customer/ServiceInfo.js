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

class ServiceInfo extends Component {
  componentDidMount() {
    const { getSelectedVehicle, customerVehicles, customerServices, selectedVehicle } = this.props
    const {
        match: { params: { vehicleid } }
    } = this.props
}

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].vehicleid === id) {
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

    if (selectedService) {
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
                          {selectedService.date}
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
   getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer))
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(ServiceInfo));