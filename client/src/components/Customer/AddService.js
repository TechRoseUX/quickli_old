import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewCustomer, createNewVehicle } from '../../store/actions/customer'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import phoneb from '../../rersources/svg/phoneb.svg';
import pencilb from '../../rersources/svg/pencilb.svg';
import mileageb from '../../rersources/svg/mileageb.svg';
import hashb from '../../rersources/svg/hashb.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import StyledBackIcon from './Styled/StyledBackIcon';
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
    label: 'Name', name: 'name', svg: userb, placeholder: 'Enter name...', noValueError: 'You must provide a name'
  },
  {
    label: 'Mileage', name: 'mileage', svg: mileageb, placeholder: 'Enter vehicle mileage...', noValueError: 'You must provide a value for mileage'
  },
  {
    label: 'Phone Number', name: 'pnumber', svg: phoneb, placeholder: 'Enter phone number...',  noValueError: 'You must provide a phone number'
  },
  {
    label: 'Reason For Visit', name: 'reason', svg: pencilb, placeholder: 'Enter reason...', noValueError: 'You must provide a reason for visit'
  },
  {
    label: 'Tag Number', name: 'tnumber', svg: hashb, placeholder: 'Enter tag number...', noValueError: 'You must provide a tag number'
  }
]

class AddService extends Component {

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

  goBack() {
    const { history } = this.props
    history.go(-1)
  }

  render() {
    const { createNewService, selectedCustomer, selectedVehicle } = this.props
    console.log(this.props);
    console.log(selectedCustomer);
    console.log(selectedVehicle);
    const props = this.props

    const createBody = (values, props) => {
      const history = this.props.history;
        let dataa = {
          values: values,
          props: props
        }
        createNewService(dataa);
        history.push('/customers/chat/service')
        window.location.reload();
    }

    return (
      <div>
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
  form: 'newServiceForm'
})(AddService)