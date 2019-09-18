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

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';


const FIELDS = [
  {
    label: 'Email', name: 'email', svg: userb, placeholder: 'Enter Email....', noValueError: 'You must provide a email address'
  },
  {
    label: 'Password', name: 'password', svg: lockb, placeholder: 'Enter Password....', noValueError: 'You must provide a password'
  },
  {
    label: 'Confirm Password', name: 'password2', svg: lockb, placeholder: 'Confirm Password....', noValueError: 'Please confirm your password'
  }
]

class RegisterUser extends Component {

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

  render() {
    const { createNewUser } = this.props
    return (
      <div>
          <MainBG>
            <NewDiv
              width="418px"
              height="700px"
              background="purple"
              margin="0 auto"
            >
              <NewDiv
                margin="200px 0 56px 0"
              >
                  <img src = { mainLogo } />
                </NewDiv>
                <form onSubmit={this.props.handleSubmit(values => createNewUser(values))}>
                  {this.renderFields()}
                  <Button
                    width="416px"
                    height="50px"
                    backgroundColor="#004A6A"
                    type="submit"
                  >
                    <Text
                      buttonText
                    >
                      Sign Up
                    </Text>
                  </Button>
                  <Link to ="/">
                    Cancel
                  </Link>
                </form>
            </NewDiv>
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