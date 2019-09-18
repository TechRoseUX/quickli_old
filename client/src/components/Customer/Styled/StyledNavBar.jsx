import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { device } from '../Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import userb from '../../../rersources/svg/userb.svg';
import lockb from '../../../rersources/svg/lockb.svg';
import { NewDiv } from '../Styled/StyledComponents';
import Button from './Button';
import Text from './Text';


export const HeaderContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        height: 100vh;
        background-color: red;
        float: left;
        position: absolute;
        z-index: 100;
        display: ${({ display }) => (display || 'none')};
    } 
`

export const HeaderTop = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        height: 207px;
        padding-top: 15px;
        background-color: green;
    } 
`

export const HeaderTopImg = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin: 0 auto;
        background: orange;
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
        background: brown;
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
        position: absolute;
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
    render() {
        const { renderContent, toggleNavBar, toggleNavToggle, fetchUser, showNavBar, showNavToggle } = this.props
        console.log(showNavToggle);
        console.log(showNavBar);
        const toggleNav = () => {
            if (showNavBar === 'block') {
                toggleNavBar('none')
                toggleNavToggle(lockb);
            } else {
                toggleNavBar('block');
                toggleNavToggle(userb);
            }
        }
        return (
            <div>
            <HeaderContainer
                display={showNavBar}
            >
                <HeaderTop>
                      <HeaderTopImg />
                      <HeaderTopText>
                          <Text
                          >
                              Haron Jaguar Land Rover
                          </Text>
                          <Text
                          >
                              Welcome
                          </Text>
                      </HeaderTopText>
                </HeaderTop>
                <Link to ='/login'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              Login
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/new-customer'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
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
                <Link to ='/new-vehicle'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              New Vehicle
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/current-vehicles'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
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
                              <SVG src={userb} />
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
                <Link to ='/settings'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              Settings
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/logout'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
                          </NavLIIcon>
                      </LILeft>
                      <LIRight>
                          <Text
                              navItem
                          >
                              Logout
                          </Text>
                      </LIRight>
                  </HeaderLIContainer>
                </Link>
                <Link to ='/logout'>
                  <HeaderLIContainer>
                      <LILeft>
                          <NavLIIcon>
                              <SVG src={userb} />
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
                </Link>
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

