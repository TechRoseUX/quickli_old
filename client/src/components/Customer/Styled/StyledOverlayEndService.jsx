import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { device } from './StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../../constants/colors'
import userb from '../../../rersources/svg/userb.svg';
import lockb from '../../../rersources/svg/lockb.svg';
import closer from '../../../rersources/svg/closer.svg';
import { NewDiv } from './StyledComponents';
import Button from './Button';
import Text from './Text';
import { toggleTemplateOverlay } from '../../../store/reducers/environment';
import { createNewCustomer } from '../../../store/actions/customer';


const StyledOverlayContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100%;
        height: 100%;
        background: black;
        opacity: .8;
        position: fixed;
        z-index: 1000;
    }
`

const StyledOverlayContentBox = styled(NewDiv)`
    @media ${device.tablet} {
        width: 500px;
        height: 550px;
        background: rgb(89,200,248);
        background: linear-gradient(180deg, rgba(89,200,248,1) 0%, rgba(255,255,255,1) 100%);
        position: fixed;
        left: 50%;
        margin-left: -250px;
        margin-top: 150px;
        z-index: 2000;
    }
`

const OverlayContentContainer = styled(NewDiv)`
    @media ${device.tablet} {
        padding: 50px 50px 0px 50px;
    }
`

const CustomerInputMessage = styled.input`
    @media ${device.tablet} {
        width: 200px;
        outline: none;
        border: none;
        height: 40px;
        border-bottom: 1px solid ${Colors.fullWhite};
    }
`

const CustomerInputMessageLarge = styled.textarea`
    @media ${device.tablet} {
        width: 300px;
        height: 100px !important;
        outline: none;
        border: none;
        height: 40px;
        border-bottom: 1px solid ${Colors.fullWhite};
    }
`

const TemplateNavContainer = styled.div`
    @media ${device.tablet} {
        bottom: 225px;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        width: 325px;
        display: flex
        justify-content: space-between;
        align-items: center;
    }
`

const CloseTemplateOverlay = styled.div`
    @media ${device.tablet} {
        width: 50px;
        height: 50px;
        margin-top: 25px;
        margin-left: 25px;

        svg {
            height: 100%;
            width: 100%;
        }
    }
`

class StyledOverlayEndService extends Component  {

    componentDidMount() {
    }

    handleChange(event) {
        const input = event.target.value
        this.setState({ customText: input})
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    handleEnd = (e, value) => {
        e.preventDefault()
        const { history, toggleEndServiceOverlay } = this.props
        toggleEndServiceOverlay(false);
        history.push('/end-service');
    }

    closeEndServiceOverlayFunc = () => {
        const { toggleEndServiceOverlay } = this.props
        toggleEndServiceOverlay(false);
    }

    render() {
        const { getSelectedMessageText } = this.props
        return (
            <div>
                <StyledOverlayContainer>
                </StyledOverlayContainer>
                <StyledOverlayContentBox>
                    <CloseTemplateOverlay
                        onClick={this.closeEndServiceOverlayFunc}
                    >
                        <SVG src={closer} />
                    </CloseTemplateOverlay>
                    <NewDiv
                        width='350px'
                        margin='0 auto'
                    >
                        <Text
                            margin='125px 0 0 0'
                            dblue22
                        >
                            Are you sure you would like to end this conversation?
                        </Text>
                    </NewDiv>
                    <TemplateNavContainer 
                    >
                        <Button
                            onClick={this.closeEndServiceOverlayFunc}
                            backgroundColor={Colors.fullWhite}
                            borderRadius='25px'
                        >
                            <Text
                                dblue16
                            >
                                Cancel
                            </Text>
                        </Button>
                        <Button
                            standardBtn
                            onClick={this.handleEnd}
                        >
                            <Text
                                white16
                            >
                                Yes
                            </Text>
                        </Button>
                    </TemplateNavContainer>
                </StyledOverlayContentBox>
           </div>
          )
    }
   
  }

  export default StyledOverlayEndService;