import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewCustomer } from '../../store/actions/customer'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import barsw from '../../rersources/svg/barsw.svg';
import emailb from '../../rersources/svg/emailb.svg';
import phoneb from '../../rersources/svg/phoneb.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import { MainBG, NewDiv, MainHeading } from './Styled/StyledComponents';
import mainLogo from '../../rersources/mainLogo.png';
import { device } from './Styled/StyledMediaQuery';

import SVG from 'react-inlinesvg';

import TextField from './TextField';
import Button from './Styled/Button';
import Text from './Styled/Text';
import StyledBackIcon from './Styled/StyledBackIcon';

const ConfirmContentContainer = styled.div`
    @media ${device.tablet} {
        padding-top: 300px;
        width: 500px;
        text-align: center;
        margin: 0 auto;
    }
`

const FormContainer = styled(NewDiv)`
    @media ${device.tablet} {
          width: 500px;
          min-height: 1200px;
          margin: 0 auto;  
    }

    @media ${device.laptop} {
      width: 500px;
      min-height: 100vh;
      margin: 0 auto;  
    }
`

const FIELDS = [
  {
    label: 'Customer Name', name: 'cname', svg: userb, placeholder: 'Enter Customer Name...', noValueError: 'You must provide a customer name'
  },
  {
    label: 'Phone Number', name: 'pnumber', svg: phoneb, placeholder: 'Enter Phone Number...', noValueError: 'You must provide a phone number'
  },
  {
    label: 'Secondary Phone Number', name: 'pnumber2', svg: phoneb, placeholder: 'Enter Secondary Phone Number', noValueError: 'You must provide a secondary phone number'
  },
  {
    label: 'Customer Email', name: 'email', svg: emailb, placeholder: 'Enter Email...', noValueError: 'You must provide a email address'
  },
]

class AddCustomer extends Component {
  componentDidMount() {
    const {showNavBar, toggleNavBar, toggleNavToggle } = this.props
    if (showNavBar === 'block') {
      toggleNavBar('none')
      toggleNavToggle(barsw);
    } else {
      console.log('Not showing....');
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

  goBack() {
    const { history } = this.props
    history.go(-1)
  }

  refreshWindow = () => {
    window.location.reload()
  }

  addNewCustomer = (values) => {
      const { createNewCustomer, history, realCustomers } = this.props
      console.log(realCustomers);
      createNewCustomer(values);
      history.push('/new-customer/confirmation');
      setTimeout(this.refreshWindow, 1000);
  }

  render() {
    const { createNewCustomer, history } = this.props
    console.log(createNewCustomer);
    const props = this.props
    const data = props && props.auth ? props.auth.data : null;

    console.log(this.props)

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
                  <form onSubmit={this.props.handleSubmit(values => this.addNewCustomer(values))}>
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
        <div>
                    <MainBG>
                        <ConfirmContentContainer>
                           <p>Loading..</p>
                        </ConfirmContentContainer>
                    </MainBG>
                </div>
      )
    }
  }
}

const validate = (values, props) => {
  //const { realCustomers } = this.props
  const errors = {};

  if (!values.cname) {
    errors.cname = 'You must provide a customer name'
  }

  if (!values.email) {
    errors.email = 'You must provide an email'
  }

  if (!values.pnumber) {
    errors.pnumber = 'You must provide a phone number'
  }

  if (!values.pnumber) {
    errors.pnumber2 = 'You must provide a secondary phone number'
  }

 
  for (var i=0; i < props.realCustomers.length; i++) {
    if (values.email == props.realCustomers[i].email) {
      errors.email = 'This email is already in use'
      console.log('ERROR');
    } else {
      console.log('SUCCESS');
    }
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'newCustomerForm'
})(AddCustomer)