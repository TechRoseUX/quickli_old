import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewCustomer, createNewVehicle } from '../../store/actions/customer'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
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
    label: 'Phone Number', name: 'pnumber', svg: userb, placeholder: 'Enter phone number...', noValueError: 'You must provide a phone number'
  },
  {
    label: 'Secondary Phone Number', name: 'pnumber2', svg: userb, placeholder: 'Enter secondary phone number...',  noValueError: 'You must provide a secondary phone number'
  },
  {
    label: 'Vehicle Year', name: 'vyear', svg: userb, placeholder: 'Enter vehicle year...', noValueError: 'You must provide a vehicle year'
  },
  {
    label: 'Vehicle Make', name: 'vmake', svg: userb, placeholder: 'Enter vehicle make...', noValueError: 'You must provide a vehicle make'
  },
  {
    label: 'Vehicle Model', name: 'vmodel', svg: userb, placeholder: 'Enter vehicle model..', noValueError: 'You must provide a vehicle model'
  },
  {
    label: 'License Plate Number', name: 'lpnumber', svg: userb, placeholder: 'Enter license plate number...', noValueError: 'You must provide a license plate number'
  },
  {
    label: 'Vehicle Vin Number', name: 'vnumber', svg: userb, placeholder: 'Enter vehicle vin number...', noValueError: 'You must provide a vin number'
  },
  {
    label: 'Mileage', name: 'mileage', svg: userb, placeholder: 'Enter mileage...', noValueError: 'You must provide the mileage'
  },
  {
    label: 'Tag Number', name: 'tnumber', svg: userb, placeholder: 'Enter tag number...', noValueError: 'You must provide a tag number'
  },
]

class AddVehicle extends Component {

  newSubmission = (values, props) => {
    console.log(values, props)
    createNewVehicle(values)
  }

  renderFields = () => {
    const selectedCustomer = this.props.selectedCustomer
    return FIELDS.map(field => {
      return(
        <Field 
          key={field.name}
          label={field.label} 
          type="text" 
          name={field.name} 
          component={TextField} 
          fieldWidth="428px"
          containerWidth="500px" 
          placeholder={field.placeholder}
          svg={field.svg}
      />
      )  
    });
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  render() {
    const { createNewVehicle, selectedCustomer } = this.props
    console.log(this.props);
    console.log(selectedCustomer);
    const props = this.props

    const createBody = (values, props) => {
        let dataa = {
          values: values,
          props: props
        }

        createNewVehicle(dataa);
    }

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
            <form onSubmit={this.props.handleSubmit(values => createBody(values, props))}>
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
  form: 'newVehicleForm'
})(AddVehicle)