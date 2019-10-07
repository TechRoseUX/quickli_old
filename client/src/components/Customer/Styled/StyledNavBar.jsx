import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { device } from '../Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../../constants/colors';
import userb from '../../../rersources/svg/userb.svg';
import lockb from '../../../rersources/svg/lockb.svg';
import plusw from '../../../rersources/svg/plusw.svg';
import pointw from '../../../rersources/svg/pointw.svg';
import phonebookw from '../../../rersources/svg/phonebookw.svg';
import settingsw from '../../../rersources/svg/settingsw.svg';
import returnw from '../../../rersources/svg/returnw.svg';
import barsw from '../../../rersources/svg/barsw.svg';
import { NewDiv } from '../Styled/StyledComponents';
import Button from './Button';
import Text from './Text';

export const MainNavContainer = styled(NewDiv)`
    @media ${device.tablet} {
        background-color: ${Colors.black};
        width: 100%;
        opacity: .8;
        z-index: 90;
        display: ${({ display }) => (display || 'none')};
        position: fixed;
        top: 0;
        bottom: 0;
    }
`

export const HeaderContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        background-color: ${Colors.lightBlue};
        float: left;
        position: fixed;
        height: 100vh;
        z-index: 100;
        display: ${({ display }) => (display || 'none')};
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    } 
`

export const HeaderTop = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        height: 207px;
        padding-top: 15px;
        background-color: ${Colors.fullWhite};
        border-top-right-radius: 20px;
    } 
`

export const HeaderTopImg = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin: 0 auto;
        background: ${Colors.darkBlue};
    }
`

export const HeaderTopText = styled(NewDiv)`
    @media ${device.tablet} {
        width: 92%;
        margin: 0 auto;
        margin-top: 15px;
    }
`

export const HeaderLIContainer = styled(NewDiv)`
    @media ${device.tablet} {
        height: 70px;
        width: 100%
        border-bottom: 1px solid white;
        background: ${Colors.lightBlue};
    }
`

export const LILeft = styled(NewDiv)`
    @media ${device.tablet} {
        float: left;
        width: 80px;
        height: 70px;
    }
`

export const LIRight = styled(NewDiv)`
    @media ${device.tablet} {
        float: right;
        width: 243px;
        height: 70px;
        text-align: left;
        line-height: 70px;
    }
`

export const NavLIIcon = styled(NewDiv)`
    @media ${device.tablet} {
        padding-top: 20px;
        width: 30px;
        height: 30px;
        margin: 0 auto;

       svg {
           width: 30px;
           height: 30px;
       } 
    }
`

export const NavToggleIcon = styled(NewDiv)`
    @media ${device.tablet} {
        height: 50px;
        width: 50px;
        position: fixed;
        bottom: 35px;
        left: 25px;
        display: ${({ display }) => (display || 'none')};
        z-index: 999;

        svg {
            height: 50px;
            width: 50px;
        }
    }
`

class StyledNavBar extends Component  {

    handleLogout = () => {
        const { logoutUser, history } = this.props
        console.log('Handling logout....')
        logoutUser();
        history.push('/')
        window.location.reload()
    }

    render() {
        const { renderContent, toggleNavBar, toggleNavToggle, fetchUser, showNavBar, showNavToggle, auth } = this.props
        const data = this.props && this.props.auth ? this.props.auth.data: null
        var companyName;
        if (data) {
            companyName = data.email
        } else {
            companyName = 'No Company Name'
        }
        console.log(showNavToggle);
        console.log(showNavBar);
        const toggleNav = () => {
            if (showNavBar === 'block') {
                toggleNavBar('none')
                toggleNavToggle(barsw);
            } else {
                toggleNavBar('block');
                toggleNavToggle(returnw);
            }
        }
        return (
          <div>
              <MainNavContainer 
                display={showNavBar}
              />
            <HeaderContainer
                display={showNavBar}
            >
                <HeaderTop>
                      <HeaderTopImg />
                      <HeaderTopText>
                          <Text
                            lblue22
                            padding="10px 0 0 0"
                            maxWidth="300px"
                          >
                              {companyName}
                          </Text>
                          <Text
                            gray30
                            padding="10px 0 0 0"
                          >
                              Welcome
                          </Text>
                      </HeaderTopText>
                </HeaderTop>
                <Link to ='/new-customer'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={plusw} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              New Customer
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/customers/chat/service'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={pointw} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              Current Vehicles
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/all-customers'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={phonebookw} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              All Customers
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                  <HeaderLIContainer
                    onClick={this.handleLogout}
                  >
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={settingsw} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              {renderContent()}
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
            </HeaderContainer>
             <NavToggleIcon
             onClick={toggleNav}
             display='block'
           >
               <SVG src={showNavToggle} />
           </NavToggleIcon>
           </div>
          )
    }
   
  }

  export default withRouter(StyledNavBar);

