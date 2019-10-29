import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewCustomer, createNewVehicle } from '../../store/actions/customer'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../constants/colors';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import phoneb from '../../rersources/svg/phoneb.svg';
import pencilb from '../../rersources/svg/pencilb.svg';
import mileageb from '../../rersources/svg/mileageb.svg';
import numberb from '../../rersources/svg/numberb.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import StyledBackIcon from './Styled/StyledBackIcon';
import { MainBG, NewDiv, MainHeading } from './Styled/StyledComponents';
import mainLogo from '../../rersources/mainLogo.png';
import { device } from './Styled/StyledMediaQuery';

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';
import { getSelectedVehicle } from '../../store/reducers/environment';

const FormContainer = styled(NewDiv)`
    @media ${device.tablet} {
          width: 500px;
          min-height: 1200px;
          margin: 0 auto;  
    }

    @media ${device.laptop} {
      width: 500px;
      min-height: 700px;
      margin: 0 auto;  
    }

`

const DetailsTextarea = styled.textarea`
    -webkit-appearance: none;
    background-color: ${Colors.fullWhite};
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 0;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;

  @media ${device.tablet} {
    width: 500px;
    height: 250px;
    margin: 0 auto;
    margin-bottom: 50px;  
  }
`

const FIELDS = []

class AddService extends Component {
  constructor() {
    super()

    this.state = {
      currentDetailsText: ''
    }

    this.updateTextarea = this.updateTextarea.bind(this)
  }

  componentDidMount() {
    const { selectedCustomer, selectedVehicle, getRealCustomers, realCustomers } = this.props
    console.log(selectedVehicle)
    console.log(selectedCustomer)

    if (!selectedCustomer) {
      setTimeout(this.getCustomerFromParams, 3000)
    } else {
        console.log('There is something')
        console.log(realCustomers)
    }
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

  searchc = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].customerid === id) {
            return myArray[i];
        }
    }
  }

  searchv = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].vehicleid === id) {
            return myArray[i];
        }
    }
  }
  
  getCustomerFromParams = () => {
      const { realCustomers, selectedCustomer, customerVehicles, getSelectedCustomer, getSelectedVehicle } = this.props
      const {
          match: { params: { customerid } }
      } = this.props

      const {
        match: { params: { vehicleid } }
    } = this.props

      const sc = this.searchc(customerid, realCustomers);
      const sv = this.searchv(vehicleid, customerVehicles);

      console.log(sc)
      
      getSelectedCustomer(sc);
      getSelectedVehicle(sv);
  }

  renderFields = () => {
    const { selectedCustomer, selectedVehicle } = this.props
    console.log(selectedCustomer)
    console.log(selectedVehicle)

    if (selectedCustomer && selectedVehicle) {
      console.log(selectedVehicle)
      const name = {
        label: 'Name', name: 'name', svg: userb, placeholder: 'Enter name...', noValueError: 'You must provide a name', defaultValue: selectedCustomer.name
      }
  
      const vMileage = {
        label: 'Mileage', name: 'mileage', svg: mileageb, placeholder: 'Enter mileage...', noValueError: 'You must provide the mileage', defaultValue: selectedVehicle.vehicleMileage
      }
  
      const number = {
        label: 'Phone Number', name: 'pnumber', svg: phoneb, placeholder: 'Enter phone number...', noValueError: 'You must provide a phone number', defaultValue: selectedCustomer.phoneNumber1
      }
  
     const reason = {
        label: 'Reason For Visit', name: 'reason', svg: pencilb, placeholder: 'Enter reason...', noValueError: 'You must provide a reason for visit'
     }
  
      const tNumber = {
        label: 'Tag Number', name: 'tnumber', svg: numberb, placeholder: 'Enter tag number...', noValueError: 'You must provide a tag number'
      }
  
      if (FIELDS.length < 1) {
        FIELDS.push(name)
        FIELDS.push(vMileage)
        FIELDS.push(number)
        FIELDS.push(reason)
        FIELDS.push(tNumber)
      }
    }

    if (selectedCustomer && selectedVehicle) {
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
          <div>Loading.....</div>
        )
    }
  }

  renderDetailsField = () => {
    console.log('Here is the details textarea....')
  }

  handleInputChange = () => {
      console.log('The input field is being changed.')
  }

  goBack() {
    const { history } = this.props
    history.go(-1)
  }

  updateTextarea = (e) => {
    const newDetailsText = e.target.value
    this.setState({ currentDetailsText: newDetailsText});
    console.log(this.state.currentDetailsText)
  }

  refreshWindow = () => {
    window.location.reload()
  }

  render() {
    const { createNewService, selectedCustomer, selectedVehicle } = this.props
    const props = this.props
    const currentDetailsText = this.state.currentDetailsText

    const data = props && props.auth ? props.auth.data : null;

    const createBody = (values, props) => {
      const history = this.props.history;
        let dataa = {
          values: values,
          props: props,
          detailsText: currentDetailsText
        }

        var myJSON = JSON.stringify(dataa)

        console.log(`Here is the data ${myJSON}`)
        createNewService(dataa);
        history.push('/customers/chat/service');
        setTimeout(this.refreshWindow, 1000)
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
                <DetailsTextarea 
                  value={this.state.currentDetailsText}
                  onChange={this.updateTextarea}
                  placeholder='Enter Details...'
                />
                <Button
                  standardBtn
                  margin="0 auto"
                  marginBottom='50px'
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

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please confirm customer name by selecting the text field.'
  }

  if (!values.pnumber) {
    errors.pnumber = 'Please confirm customer phone number by selecting the text field.'
  }

  if (!values.reason) {
    errors.reason = 'You must provide a reason for service.'
  }

  if (!values.tnumber) {
    errors.tnumber = 'You must provide a tag number'
  }

  if (!values.mileage) {
    errors.mileage = 'Please confirm mileage by selecting the text field.'
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'newServiceForm'
})(AddService)