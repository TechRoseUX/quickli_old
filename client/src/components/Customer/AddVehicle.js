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
import calendarb from '../../rersources/svg/calendarb.svg';
import carb from '../../rersources/svg/carb.svg';
import licenseb from '../../rersources/svg/licenseb.svg';
import vinb from '../../rersources/svg/vinb.svg';
import pencilb from '../../rersources/svg/pencilb.svg';
import mileageb from '../../rersources/svg/mileageb.svg';
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

const FIELDS = []

class AddVehicle extends Component {
  componentDidMount() {
    const { selectedCustomer, realCustomers, getRealCustomers } = this.props

    if (!selectedCustomer) {
        setTimeout(this.getCustomerFromParams, 3000)
    } else {
        console.log('There is something')
        console.log(realCustomers)
    }
}

search = (id, myArray) => {
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].customerid === id) {
          return myArray[i];
      }
  }
}

getCustomerFromParams = () => {
    const { realCustomers, selectedCustomer, getSelectedCustomer } = this.props

    const {
        match: { params: { customerid } }
    } = this.props

    console.log(realCustomers)
    console.log(this.props)
    const sc = this.search(customerid, realCustomers);
    console.log(sc)
    getSelectedCustomer(sc);
}

  renderFields = () => {
    const { selectedCustomer } = this.props

    if (selectedCustomer) {
      const number = {
        label: 'Phone Number', name: 'pnumber', svg: phoneb, placeholder: 'Enter phone number...', noValueError: 'You must provide a phone number', defaultValue: selectedCustomer.phoneNumber1
      }
  
      const number2 = {
        label: 'Secondary Phone Number', name: 'pnumber2', svg: phoneb, placeholder: 'Enter secondary phone number...',  noValueError: 'You must provide a secondary phone number', defaultValue: selectedCustomer.phoneNumber2
      }
  
      const vYear = {
        label: 'Vehicle Year', name: 'vyear', svg: calendarb, placeholder: 'Enter vehicle year...', noValueError: 'You must provide a vehicle year'
      }
  
      const vMake = {
        label: 'Vehicle Make', name: 'vmake', svg: carb, placeholder: 'Enter vehicle make...', noValueError: 'You must provide a vehicle make'
      }
  
      const vModel = {
        label: 'Vehicle Model', name: 'vmodel', svg: carb, placeholder: 'Enter vehicle model..', noValueError: 'You must provide a vehicle model'
      }
  
      const licenseP = {
        label: 'License Plate Number', name: 'lpnumber', svg: licenseb, placeholder: 'Enter license plate number...', noValueError: 'You must provide a license plate number'
      }
  
      const vVin = {
        label: 'Vehicle Vin Number', name: 'vnumber', svg: vinb, placeholder: 'Enter vehicle vin number...', noValueError: 'You must provide a vin number'
      }
  
      const vMileage = {
        label: 'Mileage', name: 'mileage', svg: mileageb, placeholder: 'Enter mileage...', noValueError: 'You must provide the mileage'
      }
  
      if (FIELDS.length < 1) {
        FIELDS.push(number)
        FIELDS.push(number2)
        FIELDS.push(vYear)
        FIELDS.push(vMake)
        FIELDS.push(vModel)
        FIELDS.push(licenseP)
        FIELDS.push(vVin)
        FIELDS.push(vMileage)
    }
  }

    console.log(selectedCustomer)

    if (selectedCustomer) {
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
            value='value'
            defaultValue={field.defaultValue}
            svg={field.svg}
        />
        )  
      });
    } else {
      return (
        <div>
          Loading.......
        </div>
      )
    }
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  goBack() {
    const { history, selectedCustomer } = this.props
    console.log(this.props)
    console.log(`Here is the selected customer ${selectedCustomer}`);
    history.go(-1)
  }

  historyAndReload = () => {
    const { history } = this.props
    history.push('/login');
    window.location.reload()
  }

  renderNotLoggedIn = () => {
    return (
      <div>
          <MainBG>
              <Text
                white35
                padding='100px 0 50px 0'
                maxWidth='600px'
                margin='0 auto'
              >
                You are not logged in. Please click the button below to return to the login screen.
              </Text>
            <Button
              standardBtn
              margin='0 auto'
              onClick={this.historyAndReload}
            >
              <Text
                buttonText
              >
                Login
              </Text>

            </Button>
          </MainBG>
      </div>
    )
  }

  refreshWindow = () => {
    window.location.reload()
  }

  render() {
    const { createNewVehicle, selectedCustomer, customerid } = this.props
    console.log(this.props);
    console.log(selectedCustomer);
    const props = this.props
    const data = props && props.auth ? props.auth.data : null;

    const createBody = (values, props) => {
      const history = props.history
        let dataa = {
          values: values,
          props: props
        }
        console.log('creating new vehicle.....')
        createNewVehicle(dataa);
        console.log(history)
        history.push(`/new-vehicle/${selectedCustomer.customerid}/confirmation`);
        setTimeout(this.refreshWindow, 1000);
    }

    if (data) {
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
    } else {
      return (
        this.renderNotLoggedIn()
      )
    }
  }
}

const validate = (values, props, field) => {
  const errors = {};

  if (!values.cname) {
    errors.cname = 'You must provide a customer name'
  }

  if (!values.vyear) {
    errors.vyear = 'You must provide a vehicle year'
  }

  if (!values.vmake) {
    errors.vmake = 'You must provide a vehicle make'
  }

  if (!values.vmodel) {
    errors.vmodel = 'You must provide a vehicle model'
  }

  if (!values.lpnumber) {
    errors.lpnumber = 'You must provide a license number'
  }

  if (!values.vnumber) {
    errors.vnumber = 'You must provide a vin number'
  }

  if (!values.mileage) {
    errors.mileage = 'You must provide vehicle mileage'
  }

  if (!values.pnumber) {
    errors.pnumber = 'Please confirm phone number by selecting the text field.'
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'newVehicleForm'
})(AddVehicle)