import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createNewUser } from '../../store/actions/customer';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

import Colors from '../constants/colors';
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

`

const CodeContainer = styled(NewDiv)`
  @media ${device.tablet} {
    width: 418px;
    height: 700px;
    margin: 0 auto;
  } 
`

class RegisterCode extends Component {
    state = {
        codeValue: ''
    }
    render() {
        return (
            <MainBG>
                <CodeContainer>
                    <form method="POST" onChange={this.handleChange} onSubmit={(e) => this.sendNewMessage(e, this)}>
                        <CodeTextBox
                            width="97%"
                            placeholder="Enter Message..."
                            value=''
                            name="toMessage"
                        />
                    </form>
                </CodeContainer>
            </MainBG>
        )
    }


    submitCode = () => {
        const { history } = this.props
        const correctVal = 'hello'
        const codeVal = this.state.codeValue
        if (codeVal === correctVal) {
            history.push('/register');
        } else {
            console.log('that was not the right value')
        }
    }
}

export default withRouter(RegisterCode);