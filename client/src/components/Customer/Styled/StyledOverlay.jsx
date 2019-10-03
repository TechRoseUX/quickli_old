import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { device } from '../Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../../constants/colors'
import userb from '../../../rersources/svg/userb.svg';
import lockb from '../../../rersources/svg/lockb.svg';
import closer from '../../../rersources/svg/closer.svg';
import { NewDiv } from '../Styled/StyledComponents';
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
        position: fixed
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
        bottom: 75px;
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

class StyledOverlay extends Component  {
    constructor() {
        super()
        this.state = { 
            customText: '',
            templateNumber: 0
        }

            this.forwardTemplate = this.forwardTemplate.bind(this);
            this.backTemplate = this.backTemplate.bind(this);
  //      this.handleChange = this.handleChange.bind(this)
  //      this.handleSubmit = this.handleSubmit.bind(this)
    }

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

    handleNew = (e, value) => {
        e.preventDefault()
        console.log(value)
    }

    template1 = () => {
        const { selectedServiceMessage } = this.props
        console.log(selectedServiceMessage)
        const text1 = `Hello ${selectedServiceMessage.customerName}, thank you for bringing in your vehicle.`;
        const text2 = 'We have now started on your vehicle. You will receive a real time update for each service.';
        const newText = `${text1} ${text2} ${this.state.customText}`;


       const getCorrectMessageText = () => {
            const { getSelectedMessageText, selectedMessageText, toggleTemplateOverlay } = this.props
            console.log(newText)
            getSelectedMessageText(newText);
            toggleTemplateOverlay(false)
        }

        return (
            <NewDiv
                width="90%"
                margin="0 auto"
            >
                <OverlayContentContainer>
                    <form onSubmit={(e) => this.handleNew(e, this)}>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text1}
                    </Text>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text2}
                    </Text>
                    <NewDiv
                        padding="10px 0 0 0"
                    >
                        <CustomerInputMessage 
                            type="text"
                            onChange={this.handleChange.bind(this)}
                            name="customMessage"
                            value={this.state.customText}
                        />
                    </NewDiv>
                    <NewDiv
                        padding="50px 0 0 0"
                    >
                        <Button
                            standardBtn
                            margin="0 auto"
                            onClick={getCorrectMessageText}
                        >
                            <Text
                            >
                                Send Message
                            </Text>
                        </Button>
                    </NewDiv>
                    </form>
                </OverlayContentContainer>
            </NewDiv>
        )
    }
    
    template2 = () => {
        const { selectedServiceMessage } = this.props
        console.log(selectedServiceMessage)
        const text1 = `Hello ${selectedServiceMessage.customerName},`;
        const text2 = 'we have completed your';
        const newText = `${text1} ${text2} ${this.state.customText}`;


       const getCorrectMessageText = () => {
            const { getSelectedMessageText, selectedMessageText, toggleTemplateOverlay } = this.props
            console.log(newText)
            getSelectedMessageText(newText);
            toggleTemplateOverlay(false)
        }

        return (
            <NewDiv
                width="90%"
                margin="0 auto"
            >
                <OverlayContentContainer>
                    <form onSubmit={(e) => this.handleNew(e, this)}>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text1}
                    </Text>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text2}
                    </Text>
                    <NewDiv
                        padding="10px 0 0 0"
                    >
                        <CustomerInputMessage 
                            type="text"
                            onChange={this.handleChange.bind(this)}
                            name="customMessage"
                            value={this.state.customText}
                        />
                    </NewDiv>
                    <NewDiv
                        padding="50px 0 0 0"
                    >
                        <Button
                            standardBtn
                            margin="0 auto"
                            onClick={getCorrectMessageText}
                        >
                            <Text
                            >
                                Send Message
                            </Text>
                        </Button>
                    </NewDiv>
                    </form>
                </OverlayContentContainer>
            </NewDiv>
        )
    }
    
    template3 = () => {
        const { selectedServiceMessage } = this.props
        console.log(selectedServiceMessage)
        const text1 = `Hello ${selectedServiceMessage.customerName}, your vehicle is now ready for pickup.`;
        const text2 = 'We are looking forward to seeing you soon, thank you.';
        const newText = `${text1} ${text2} ${this.state.customText}`;


       const getCorrectMessageText = () => {
            const { getSelectedMessageText, selectedMessageText, toggleTemplateOverlay } = this.props
            console.log(newText)
            getSelectedMessageText(newText);
            toggleTemplateOverlay(false)
        }

        return (
            <NewDiv
                width="90%"
                margin="0 auto"
            >
                <OverlayContentContainer>
                    <form onSubmit={(e) => this.handleNew(e, this)}>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text1}
                    </Text>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text2}
                    </Text>
                    <NewDiv
                        padding="10px 0 0 0"
                    >
                        <CustomerInputMessage 
                            type="text"
                            onChange={this.handleChange.bind(this)}
                            name="customMessage"
                            value={this.state.customText}
                        />
                    </NewDiv>
                    <NewDiv
                        padding="50px 0 0 0"
                    >
                        <Button
                            standardBtn
                            margin="0 auto"
                            onClick={getCorrectMessageText}
                        >
                            <Text
                            >
                                Send Message
                            </Text>
                        </Button>
                    </NewDiv>
                    </form>
                </OverlayContentContainer>
            </NewDiv>
        )
    }


    template4 = () => {
        const { selectedServiceMessage } = this.props
        console.log(selectedServiceMessage)
        const text1 = `Hello ${selectedServiceMessage.customerName},`;
        const newText = `${text1} ${this.state.customText}`;


       const getCorrectMessageText = () => {
            const { getSelectedMessageText, selectedMessageText, toggleTemplateOverlay } = this.props
            console.log(newText)
            getSelectedMessageText(newText);
            toggleTemplateOverlay(false)
        }

        return (
            <NewDiv
                width="90%"
                margin="0 auto"
            >
                <OverlayContentContainer>
                    <form onSubmit={(e) => this.handleNew(e, this)}>
                    <Text
                        inline
                        white20
                        padding="10px 0 0 0"
                    >
                        {text1}
                    </Text>
                    <NewDiv
                        padding="10px 0 0 0"
                    >
                        <CustomerInputMessageLarge 
                            type="textarea"
                            onChange={this.handleChange.bind(this)}
                            name="customMessage"
                            value={this.state.customText}
                        />
                    </NewDiv>
                    <NewDiv
                        padding="50px 0 0 0"
                    >
                        <Button
                            standardBtn
                            margin="0 auto"
                            onClick={getCorrectMessageText}
                        >
                            <Text
                            >
                                Send Message
                            </Text>
                        </Button>
                    </NewDiv>
                    </form>
                </OverlayContentContainer>
            </NewDiv>
        )
    }

    closeTemplateOverlayFunc = () => {
        const { toggleTemplateOverlay } = this.props
        toggleTemplateOverlay(false);
    }


    forwardTemplate = () => {
        const messageTemplates = [this.template1, this.template2, this.template3, this.template4]

        if (this.state.templateNumber < messageTemplates.length - 1) {
            this.setState({
                templateNumber: this.state.templateNumber + 1
            })
        } else {
            this.setState({
                templateNumber: 0
            })
        }
    }

    backTemplate = () => {
        const messageTemplates = [this.template1, this.template2, this.template3, this.template4]

        if (this.state.templateNumber > 0) {
            this.setState({
                templateNumber: this.state.templateNumber - 1
            })
        } else {
            this.setState({
                templateNumber: messageTemplates.length - 1
            })
        }
    }


    render() {
        const messageTemplates = [this.template1, this.template2, this.template3, this.template4]
        var currentTemplate = messageTemplates[this.state.templateNumber]

        const { getSelectedMessageText } = this.props

        return (
            <div>
                <StyledOverlayContainer>
                </StyledOverlayContainer>
                <StyledOverlayContentBox>
                    <CloseTemplateOverlay
                        onClick={this.closeTemplateOverlayFunc}
                    >
                        <SVG src={closer} />
                    </CloseTemplateOverlay>
                    {currentTemplate()}
                    <TemplateNavContainer
                        
                    >
                        <Button
                            onClick={this.backTemplate}
                            backgroundColor={Colors.fullWhite}
                            borderRadius='25px'
                        >
                            <Text
                                dblue16
                            >
                                Go Back
                            </Text>
                        </Button>
                        <Button
                            standardBtn
                            onClick={this.forwardTemplate}
                        >
                            <Text
                                white16
                            >
                                Go Forward
                            </Text>
                        </Button>
                    </TemplateNavContainer>
                </StyledOverlayContentBox>
           </div>
          )
    }
   
  }

  export default StyledOverlay;