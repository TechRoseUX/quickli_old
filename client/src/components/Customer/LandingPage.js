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

import { getSelectedCustomer, updateCustomerSearch, getCurrentFilter } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import barsw from '../../rersources/svg/barsw.svg';
import landingImg from '../../rersources/landing.png';
import mainL from '../../rersources/logoSvg.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';

const LHeader = styled.div`
    @media ${device.mobileS} {
        height: 80px;
        width: 100%;
        position: fixed;
        z-index: 1000;
    }
`

const LogoImg = styled.img`
    @media ${device.mobileS} {
        height: 80px;
        width: 72px;
        float: left;
        padding-left: 40px;
    }
`

const RightBtns = styled.div`
    @media ${device.mobileS} {
        float: right;
        padding-right: 10px;
        display: flex;
        margin-top: 20px;
    }

    @media ${device.tablet} {
        padding-right: 40px;
    }
`

const ContactEmail = styled.div`
    @media ${device.mobileS} {
        width: 280px;
        display: block;
        margin-right: 30px;
        background: ${Colors.fullWhite};
        display: ${({ display }) => (display || 'none')};
        border-radius: 5px;
        height: 70px;
        float: right;
        line-height: 70px;
    }
`

const ActionBtn = styled.div`
    @media ${device.mobileS} {
        width: 120px;
        height: 36px;
        background: ${({ bgColor }) => (bgColor || 'none')};
        color: ${({ color }) => (color || 'none')};
        border-radius: 20px;
        margin-left: 10px;
        -webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.16);
        -moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.16);
        box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.16);

        p {
            line-height: 8px;
            font-size: 16px;
        }
    }

    @media ${device.tablet} {
        margin-left: 10px;
    }
`

const MainContainer = styled.div`
    @media ${device.mobileS} {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${landingImg});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        height: 100vh;
        filter: blur(3px);
        -webkit-filter: blur(3px);
        z-index: 5;
        transform: scale(1.05);
    }
`

const ContentContainer = styled.div`
    z-index: 1001;
    position: fixed;

    @media ${device.mobileS} {
      width: 90%;
      margin: 0 auto;
      bottom: 128px;
    }

    @media ${device.tablet} {
        padding-top: 272px;
        bottom: auto;
        width: auto;
        margin: auto;
        margin-left: 32px;
    }
`

const LandingList = styled.ul`
    @media ${device.mobileS} {
        padding-top: 32px;
        width: 90%;
        list-style-type: disc;
        text-align: left;
        color: ${Colors.fullWhite};
        padding-left: 32px;

        li {
            padding-left: 16px;
            border-bottom: none;
        }
    }

    @media ${device.tablet} {
        padding-left: 72px;
        width: 100%;
    }
`

const Parent = styled.div`
    overflow: hidden;
`


class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            showContact: 'none'
        }
    }

    toggleShowContact = () => {
        if (this.state.showContact === 'none') {
            this.setState({ showContact: 'block' })
        } else {
            this.setState({ showContact: 'none'})
        }
    }

    openSignIn = () => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <Parent>
                <LHeader>
                    <NewDiv
                        width='100%'
                        height='100%'
                    >
                    <LogoImg src={mainL} />
                        <RightBtns>
                            <ActionBtn
                                bgColor={Colors.fullWhite}
                                color={Colors.darkBlue}
                                onClick={this.toggleShowContact}
                            >
                                <p>Contact Us</p>
                            </ActionBtn>
                            <ActionBtn
                                bgColor={Colors.darkBlue}
                                color={Colors.fullWhite}
                                onClick={this.openSignIn}
                            >
                                <p>Sign In</p>
                            </ActionBtn>
                        </RightBtns>
                    </NewDiv>
                    <ContactEmail
                        display={this.state.showContact}
                    >
                        <Text
                            lineHeight='70px'
                            color='#004A6A'
                        >
                            contactquickli@gmail.com
                        </Text>
                    </ContactEmail>
                </LHeader>
                <ContentContainer>
                    <Text
                        fontSize='48px'
                        color='#FFB000'
                        lineHeight='48px'
                    >
                        Quickli
                    </Text>
                        <Text
                            fontSize='24px'
                            padding='32px 0 0 0'
                        >
                            "Real-Quick & Real-Time"
                        </Text>
                        <LandingList>
                            <li>Easy & Quick Navigation</li>
                            <li>Real-time update templates</li>
                            <li>Auto save customer service history</li>
                        </LandingList>
                </ContentContainer>
                <MainContainer />
            </Parent>
        )
    }
}

export default withRouter(LandingPage);