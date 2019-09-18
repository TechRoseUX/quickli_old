import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewCustomer } from '../../store/actions/customer'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import userw from '../../rersources/svg/userw.svg';
import { MainBG, NewDiv, MainHeading } from './Styled/StyledComponents';
import mainLogo from '../../rersources/mainLogo.png';
import { device } from './Styled/StyledMediaQuery';

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';

const FormContainer = styled(NewDiv)`
    @media ${device.tablet} {
          width: 500px;
          height: 700px;
          margin: 0 auto;  
    }
`


const FIELDS = [
  {
    label: 'Customer Name', name: 'cname', svg: userb, placeholder: 'Enter Customer Name...', noValueError: 'You must provide a customer name'
  },
  {
    label: 'Phone Number', name: 'pnumber', svg: userb, placeholder: 'Enter Phone Number...', noValueError: 'You must provide a phone number'
  },
  {
    label: 'Secondary Phone Number', name: 'pnumber2', svg: userb, placeholder: 'Enter Secondary Phone Number', noValueError: 'You must provide a secondary phone number'
  },
  {
    label: 'Customer Email', name: 'email', svg: userb, placeholder: 'Enter Email...', noValueError: 'You must provide a email address'
  },
]

class AddCustomer extends Component {

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
          fieldWidth="428px"
          containerWidth="500px" 
      />
      )  
    });
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  render() {
    const { createNewCustomer } = this.props
    console.log(createNewCustomer);
    return (
      <div>
          <MainBG>
              <MainHeading>
                <Text
                  mainHeading
                  padding="30px 0 50px 0"
                >
                  Enter The Fields Below
                </Text>
              </MainHeading>
            <FormContainer
            >
                <form onSubmit={this.props.handleSubmit(values => createNewCustomer(values))}>
                  {this.renderFields()}
                  <Button
                    standardBtn
                    margin="0 auto"
                    type="submit"
                  >
                    <Text
                      buttonText
                    >
                      Submit
                    </Text>
                  </Button>
                  <Link to ="/">
                    Cancel
                  </Link>
                </form>
            </FormContainer>
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
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'newCustomerForm'
})(AddCustomer)