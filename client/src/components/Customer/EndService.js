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

class EndService extends Component {
  constructor() {
    super()

    this.state = {
      currentDetailsText: ''
    }
    this.updateTextarea = this.updateTextarea.bind(this)
  }

  componentDidMount() {
      const { selectedServiceMessage } = this.props
      this.setState({ currentDetailsText: selectedServiceMessage.details })
  }

  renderFields = () => {
    const { selectedCustomer, selectedServiceMessage } = this.props

    const FIELDS = [
        {
          label: 'Name', name: 'name', svg: userb, placeholder: 'Enter name...', noValueError: 'You must provide a name', defaultValue: selectedServiceMessage.customerName
        },
        {
          label: 'Mileage', name: 'mileage', svg: mileageb, placeholder: 'Enter vehicle mileage...', noValueError: 'You must provide a value for mileage', defaultValue: selectedServiceMessage.mileage
        },
        {
          label: 'Phone Number', name: 'pnumber', svg: phoneb, placeholder: 'Enter phone number...',  noValueError: 'You must provide a phone number', defaultValue: selectedServiceMessage.phoneNumber
        },
        {
          label: 'Reason For Visit', name: 'reason', svg: pencilb, placeholder: 'Enter reason...', noValueError: 'You must provide a reason for visit', defaultValue: selectedServiceMessage.reason
        },
        {
          label: 'Tag Number', name: 'tnumber', svg: hashb, placeholder: 'Enter tag number...', noValueError: 'You must provide a tag number', defaultValue: selectedServiceMessage.tagNumber
        }
      ]


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
          defaultValue={field.defaultValue}
          value="value"
          svg={field.svg}
      />
      )  
    });
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

  render() {
    const { selectedCustomer, selectedVehicle, selectedServiceText, selectedServiceMessage, updateService } = this.props
    const props = this.props
    const currentDetailsText = this.state.currentDetailsText

    console.log(selectedServiceMessage)

    const createBody = (values, props) => {
      const history = this.props.history;
        let dataa = {
          values: values,
          props: props,
          detailsText: currentDetailsText
        }

        var myJSON = JSON.stringify(dataa)

        console.log(`Here is the data ${myJSON}`)
        updateService(dataa);
        history.push('/customers/chat/service')
        window.location.reload();
    }

    return (
      <div>
      <MainBG>
          <MainHeading>
            <Text
              mainHeading
              padding="30px 0 50px 0"
            >
              Confirm Information Below
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

}

export default reduxForm({
  validate,
  form: 'newServiceForm'
})(EndService)