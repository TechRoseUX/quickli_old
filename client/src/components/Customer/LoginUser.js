import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewUser } from '../../store/actions/customer';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import { MainBG, NewDiv } from './Styled/StyledComponents';
import mainLogo from '../../rersources/mainLogo.png';
import logoSvg from '../../rersources/logoSvg.svg';
import { device } from './Styled/StyledMediaQuery';

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';
import colors from '../constants/colors';

const LogoContainer = styled(NewDiv)`
  @media ${device.tablet} {
    padding: 200px 0 56px 0;

    img {
      height: 128px;
      width: 180px;
      margin: 0 auto;
    }
  } 
`

const LoginContainer = styled(NewDiv)`
  @media ${device.tablet} {
    width: 418px;
    height: 700px;
    margin: 0 auto;
  } 

`

const FIELDS = [
  {
    label: 'Email', name: 'email', placeholder: 'Enter Email....', svg: userb, noValueError: 'You must provide a email address'
  },
  {
    label: 'Password', name: 'password', placeholder: 'Enter Password....', svg: lockb, noValueError: 'You must provide a password'
  }
]

class LoginUser extends Component {

  renderFields = () => {
    return FIELDS.map(field => {
      return(
        <Field 
          key={field.name}
          label={field.label} 
          svg={field.svg}
          type="text" 
          name={field.name} 
          placeholder={field.placeholder}
          component={TextField} 
      />
      )  
    });
  }

  handleLoginSubmit = (values) => {
    const { userLogin, history } = this.props
    userLogin(values);
   // window.location.reload()
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  render() {
    const { userLogin, logoutUser } = this.props
    return (
      <div>
          <MainBG>
            <LoginContainer
            >
              <LogoContainer
              >
                  <img src = { logoSvg } />
                </LogoContainer>
                <form onSubmit={this.props.handleSubmit(values => this.handleLoginSubmit(values))}>
                  {this.renderFields()}
                  <Button
                    width="416px"
                    height="50px"
                    backgroundColor={colors.darkBlue}
                    type="submit"
                  >
                    <Text
                      buttonText
                    >
                      Sign In
                    </Text>
                  </Button>
                </form>
            </LoginContainer>
          </MainBG>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
    console.log(values);
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'userLoginForm'
})(LoginUser)