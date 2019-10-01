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
import checkw from '../../rersources/svg/checkw.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import StyledBackIcon from './Styled/StyledBackIcon';
import Button from './Styled/Button';
import Text from './Styled/Text'; 

const ConfirmContentContainer = styled.div`
    @media ${device.tablet} {
        padding-top: 300px;
        width: 500px;
        text-align: center;
        margin: 0 auto;
    }
`

const ConfirmIconDiv = styled.div`
    @media ${device.tablet} {
        width: 200px;
        height: 200px;
        margin: 0 auto;  
    }

    svg {
        width: 100%
        height: 100%
    }
`

const ConfirmContentText = styled.div`
    @media ${device.tablet} {
        width: 500px;
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 50px;
    }
`

const ConfirmButtons = styled.div`
    @media ${device.tablet} {

    }
`

class CustomerConfirmation extends Component {
    componentDidMount() {
    }

    search = (id, myArray) => {
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].customerid === id) {
                return myArray[i];
            }
        }
    }

    openAllVehicles = () => {
        console.log('Opening all vehicles')
    }
    openAddVehicle = () => {
        const { realCustomers, selectedCustomer, getSelectedCustomer, history } = this.props
        const currentCus = realCustomers.slice(-1).pop();
        getSelectedCustomer(currentCus);
        history.push(`/new-vehicle`);
    }

    render() {
        const { realCustomers, getSelectedCustomer, selectedCustomer } = this.props

        if (realCustomers.length > 0) {
            console.log(realCustomers)
            const currentCus = realCustomers.slice(-1).pop()
            console.log(currentCus);
            return (
                <div>
                    <MainBG>
                        <ConfirmContentContainer>
                            <ConfirmIconDiv>
                                <SVG src={checkw} />
                            </ConfirmIconDiv>
                            <ConfirmContentText>
                                <Text
                                    white20
                                >
                                    {currentCus.name}
                                The new customer has been added successfully. Would you like to add a vehicle for this customer now?
                                </Text>
                        </ConfirmContentText>
                        <ConfirmButtons>
                                <Button
                                    display="inline-block"
                                    margin="0px 5px"
                                    width="156px"
                                    height="40px"
                                    borderRadius="25px"
                                    backgroundColor={Colors.fullWhite}
                                    onClick={() => this.openAllVehicles()}
                                >
                                    <Text
                                        dblue20
                                    >
                                        Not Now
                                    </Text>
                                </Button>
                                <Button
                                    display="inline-block"
                                    standardBtn
                                    margin="0px 5px"
                                    onClick={() => this.openAddVehicle()}
                                >
                                    <Text
                                        white20
                                    >
                                        Yes
                                    </Text>
                                </Button>
                            </ConfirmButtons>
                        </ConfirmContentContainer>
                    </MainBG>
                </div>
            )
        } else {
            return (
                <div>
                    <MainBG>
                        <ConfirmContentContainer>
                           <p>Loading...</p>
                        </ConfirmContentContainer>
                    </MainBG>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => ({
    state: state
  })
  
  const dispatchToProps = (dispatch) => ({
     
  })
  
  export default withRouter(connect(mapStateToProps, dispatchToProps)(CustomerConfirmation));