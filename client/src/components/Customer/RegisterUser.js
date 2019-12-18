import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewUser } from '../../store/actions/customer';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Colors from '../constants/colors';
import passcode from '../constants/passcode';
import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import { MainBG, NewDiv } from './Styled/StyledComponents';
import mainLogo from '../../rersources/mainLogo.png';
import logoSvg from '../../rersources/logoSvg.svg';
import { device } from './Styled/StyledMediaQuery';

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';

const CodeTextBox = styled.input`
  -webkit-appearance: none;
  background-color: ${Colors.fullWhite};
  outline: none;
  border: none;
  margin ${({ margin }) => (margin || '0')}; 
  border-radius: 10px;
  padding: 0;
  padding-left: 10px;
  font-size: 16px;

  @media ${device.tablet} {
      width: ${({ width }) => (width || '345px')};
      height: 50px;
      margin: 0 auto;
  }
`

const CodeContainer = styled(NewDiv)`
  @media ${device.tablet} {
    width: 418px;
    height: 500px;
    margin: 0 auto;
    margin-top: 200px;
  } 
`

const LogoContainer = styled(NewDiv)`
  @media ${device.tablet} {
    padding: 100px 0 56px 0;

    img {
      height: 128px;
      width: 180px;
      margin: 0 auto;
    }
  } 
`

const RegisterContainer = styled(NewDiv)`
  @media ${device.tablet} {
    width: 418px;
    height: 700px;
    margin: 0 auto;
  } 
`

const ImageUploadInput = styled.input`
  width: 200px;
  height: 25px;
  float: left;
  margin-bottom: 48px;
`


const FIELDS = [
  {
    label: 'Email', name: 'email', svg: userb, placeholder: 'Enter Email....', noValueError: 'You must provide a email address'
  },
  {
    label: 'Password', name: 'password', svg: lockb, placeholder: 'Enter Password....', noValueError: 'You must provide a password'
  },
  {
    label: 'Confirm Password', name: 'password2', svg: lockb, placeholder: 'Confirm Password....', noValueError: 'Please confirm your password'
  },
  {
    label: 'Company Name', name: 'companyName', svg: lockb, placeholder: 'Enter Company Name....', noValueError: 'Please enter a name for your company'
  },
  {
    label: 'Company Image', name: 'companyImage', svg: userb, placeholder: 'Enter Link To Company Image....', noValueError: 'No image link provided'
  }
]

class RegisterUser extends Component {
    state = {
      codeValue: '',
      showCode: true
  }

  renderFields = () => {
    return FIELDS.map(field => {
      return(
        <Field 
          key={field.name}
          label={field.label} 
          svg={field.svg}
          placeholder={field.placeholder}
          type="text" 
          name={field.name} 
          component={TextField}
          fieldWidth="345px"
          containerWidth="417px" 
      />
      )  
    });
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  handleChange = (e) => {
    const codeText = e.target.value
    this.setState({ codeValue: codeText});
}

  handleNewUser = (values) => {
    const { createNewUser, history } = this.props
    createNewUser(values);
  //  history.push('/login')
  }

  submitCode = (e) => {
    e.preventDefault();
    const codeVal = this.state.codeValue
    if (codeVal === passcode.passcode) {
      this.setState({ showCode: false});
    } else {
        console.log('that was not the right value')
    }
}

  render() {
    const { createNewUser } = this.props
    if (this.state.showCode === true) {
      return (
        <MainBG>
              <CodeContainer>
                <Text
                  margin='0 0 24px 0'
                  dblue30
                >Please enter the correct code to go to register
                </Text>
                  <form method="POST" onChange={this.handleChange} onSubmit={(e) => this.submitCode(e, this)}>
                    <NewDiv
                      margin='0 0 24px 0'
                    >
                      <CodeTextBox
                          width="97%"
                          placeholder="Enter Code..."
                          value={this.state.codeValue}
                          name="toMessage"
                      />
                      </NewDiv>
                      <Button
                          width="416px"
                          height="50px"
                          backgroundColor={Colors.darkBlue}
                          type="submit"
                          margin='24px 0 0 0'
                      >
                        <Text
                          white20
                        >
                          Enter Code
                        </Text>
                    </Button>
                  </form>
              </CodeContainer>
          </MainBG>
      )
    } else {
      return (
        <div>
            <MainBG>
              <RegisterContainer
              >
                <LogoContainer
                >
                    <img src = { logoSvg } />
                  </LogoContainer>
                  <form onSubmit={this.props.handleSubmit(values => this.handleNewUser(values))}>
                    {this.renderFields()}
                    <Button
                      width="416px"
                      height="50px"
                      backgroundColor={Colors.darkBlue}
                      type="submit"
                    >
                      <Text
                        buttonText
                      >
                        Sign Up
                      </Text>
                    </Button>
                  </form>
              </RegisterContainer>
            </MainBG>
        </div>
      );
    }
  }
}

const validate = (values) => {
  const errors = {};

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
    console.log(values);
     if (values.password != values.password2) {
         errors.password2 = 'Passwords do not match'
    };
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'newUserForm'
})(RegisterUser)