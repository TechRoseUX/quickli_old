import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getActiveCustomerServices, getCustomerActiveToMessages} from '../../store/actions/customer'
import { createNewToMessage } from '../../store/actions/customer'
import './customers.css';
import StyledOverlay from '../Customer/Styled/StyledOverlay';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../constants/colors';

import { getSelectedCustomer, getSelectedServiceMessage, getSelectedMessageText, toggleTemplateOverlay } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import barsw from '../../rersources/svg/barsw.svg';
import templatey from '../../rersources/svg/templatey.svg';
import senddb from '../../rersources/svg/senddb.svg';
import arrowleftw from '../../rersources/svg/arrowleftw.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import StyledBackIcon from './Styled/StyledBackIcon';
import Button from './Styled/Button';
import Text from './Styled/Text';
import { isContext } from 'vm';

const MessengerContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: scroll;
        background: ${Colors.lightBlue};
        float: left;
    }
`

const MessengerContainerTop = styled(NewDiv)`
    @media ${device.tablet} {
        width: 323px;
        height: 190px;
        background: ${Colors.lightBlue};
        border-bottom: 1px solid ${Colors.fullWhite};
    }
`

const MessengerTopText = styled(NewDiv)`
    @media ${device.tablet} {
        max-width: 175px;
        text-align: center;
        height: auto;
    }
`

const MessageCell = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100%;
        height: 90px;
        background: ${Colors.lightBlue};
        float: left;
        border-bottom: 1px solid ${Colors.fullWhite};
    }
`

const MessageCellContentTop = styled(NewDiv)`
    @media ${device.tablet} {
        width: 90%;
        height: 25px;
        padding: 15px 0px 10px 0px
    }
`

const MessageCellContentBottom = styled(NewDiv)`
    @media ${device.tablet} {
        width: 90%;
        height: 40px;
        padding: 10px 0px
        text-align: left;
    }
`

const MessengerSearchBar = styled.input`
    @media ${device.tablet} {
        width: ${({ width }) => (width|| '100%')};
        height: 40px;
        background-color: ${Colors.fullWhite};
        margin: 0 auto;
        padding-left: 10px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
    } 
`

const MessengerChatContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 511px;
        height: 100vh;
        background-color: ${Colors.lighterGray};
        float: right
    } 
`

const MessengerChatTopSec = styled(NewDiv)`
    @media ${device.tablet} {
        width: 511px;
        height: 90px;
        background-color: ${Colors.lighterGray};
        border-bottom: 1px solid ${Colors.lightBlue};
        position: fixed;
        top: 0;
        text-align: left;
    } 
`

const MessengerFixedBottom = styled(NewDiv)`
    @media ${device.tablet} {
        width: 511px;
        height: 55px;
        position: fixed;
        bottom: 0;
    } 
`

const ChatMessagesContainer = styled(NewDiv)`
    @media ${device.tablet} {
        margin-top: 100px;
        background-color: ${Colors.lighterGray};
    } 
`

const BottomLeftButton = styled(NewDiv)`
    @media ${device.tablet} {
        width: 40px;
        height: 40px;
        padding: 5px;
        display: inline-block;
        float: left;

        svg {
            width: 40px;
            height: 40px;
        }
    } 
`

const BottomRightButton = styled(NewDiv)`
    @media ${device.tablet} {
        width: 40px;
        height: 40px;
        padding: 5px;
        display: inline-block;
        float: right;

        svg {
            width: 40px;
            height: 40px;
        }
    } 
`

const BottomMiddleText = styled(NewDiv)`
    @media ${device.tablet} {
        width: 400px;
        height: 40px;
        padding: 5px 0;
        display: inline-block;
    } 
`

const ChatToRow = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100%;
        height: auto;
    } 
`

const ChatMessageToBubble = styled(NewDiv)`
    @media ${device.tablet} {
        max-width: 250px;
        height: auto;
        padding: 15px 15px;
        float: right
        margin-right: 10px;
        background: ${Colors.lightBlue};
        border-radius: 30px;
        margin-bottom: 5px;
        text-align: left;
        color: ${Colors.fullWhite};
    } 
`

class ChatMessenger extends Component {
    constructor() {
        super()
        this.state = {
            correctChats: []
        }
    }
  componentDidMount() {
    const {showNavBar, toggleNavBar, toggleNavToggle, getCustomerActiveToMessages, activeToMessages, selectedServiceMessage } = this.props

    if (showNavBar === 'block') {
        toggleNavBar('none')
        toggleNavToggle(barsw);
    } else {
        console.log('Not showing....');
    }
  }

  search = (id, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].serviceid === id) {
            return myArray[i];
        }
    }
}

  openThisChat = (v) => {
    const { customerServices, getSelectedServiceMessage, selectedServiceMessage } = this.props
    const serviceid = v.serviceid
    const sc = this.search(serviceid, customerServices);
    getSelectedServiceMessage(sc);
    console.log(selectedServiceMessage);
}

    displayOverlay = () => {
        const { showTemplateOverlay, getSelectedMessageText, selectedMesageText, toggleTemplateOverlay, selectedServiceMessage } = this.props
        if (showTemplateOverlay === true) {
            return (
                <StyledOverlay
                    getSelectedMessageText={getSelectedMessageText} 
                    selectedMesageText={selectedMesageText}
                    toggleTemplateOverlay={toggleTemplateOverlay}
                    selectedServiceMessage={selectedServiceMessage}
              />
            )
        } else {
            return (
                <div></div>
            )
        }
    }

  renderChatCells = () => {
    var activeServiceArray = []
    const customerServices = this.props.customerServices
    console.log(customerServices);

    for (var i=0; i < customerServices.length; i++) {
        if (customerServices[i].status = true) {
            activeServiceArray.push(customerServices[i])
        } else {
            console.log('Not active');
        }
        console.log(activeServiceArray)
    }
    activeServiceArray.reverse()
        return activeServiceArray.map((v) => {
            return (
                <MessageCell
                    onClick={() => this.openThisChat(v)}
                >
                    <MessageCellContentTop
                    >
                        <Text
                            dblue22
                            inline
                            float='left'
                            maxWidth='210px'
                        >
                            {v.customerName}
                        </Text>
                        <Text
                            dblue16
                            inline
                            float='right'
                            maxWidth='80px'
                        >
                            /
                        </Text>
                    </MessageCellContentTop>
                    <MessageCellContentBottom>
                        <Text
                            dblue16
                            ellipsis
                            maxWidth="100%"
                        >
                            Hey james we just wanted to reach out and let you know that we have completed the service for your vehicle and it is now ready
                        </Text>
                    </MessageCellContentBottom>
                </MessageCell>
            )
        })
  }

  renderServiceId = () => {
      const {selectedServiceMessage } = this.props
      if (selectedServiceMessage) {
            return (
                <Text
                    dblue30
                    padding="10px 0 0 10px"
                >
                    {selectedServiceMessage.serviceid}
                </Text>
            )
      } else {
          return (
              <Text
                dblue30
                padding="10px 0 0 10px"
              >
                  No Service Selected
              </Text>
          )
      }
  }

  checkMessageFunc = () => {
    const { activeToMessages, selectedServiceMessage } = this.props

    if (selectedServiceMessage) {
        for (var i=0; i < activeToMessages.length; i++) {
            if (activeToMessages[i].serviceid === selectedServiceMessage.serviceid) {

   //     this.setState({ correctChats: [...this.state.correctChats, activeToMessages[i]] })
   // this.setState(prevState => ({ correctChats: [ activeToMessages[i], ...prevState.correctChats]}))

                console.log('Pushed');
            }  else {
                console.log('did not match');
            }  
        }
    }

  }

  renderChatMessages = () => {
    const { activeToMessages, selectedServiceMessage } = this.props
    const displayedToMessages = []

    this.checkMessageFunc()

      if (selectedServiceMessage) {
        for (var i=0; i < activeToMessages.length; i++) {
            if (activeToMessages[i].serviceid === selectedServiceMessage.serviceid) {
                displayedToMessages.push(activeToMessages[i]);

    //this.setState(prevState => ({ correctChats: [ activeToMessages[i], ...prevState.correctChats]}))

                console.log('Pushed');
            }  else {
                console.log('did not match');
            }  
        }

        console.log(this.state);

        return displayedToMessages.map((v) => {
            return (
                <ChatToRow>
                    <ChatMessageToBubble>
                        {v.textMessage}
                    </ChatMessageToBubble>
                </ChatToRow>
            )
        })
      } else {
          return (
              <div>There are no messages to display</div>
          )
      }
  }

  toggleTemplateTrue = () => {
      const { toggleTemplateOverlay } = this.props
      toggleTemplateOverlay(true);
  }

  sendNewMessage = (e, value) => {
      const { selectedMessageText, createNewToMessage, selectedServiceMessage } = this.props
        e.preventDefault();
        console.log(value)
        console.log(selectedMessageText)

        const info =
            {
                textMessage: selectedMessageText,
                phoneNumber: selectedServiceMessage.phoneNumber,
                serviceid: selectedServiceMessage.serviceid,
                vehicleid: selectedServiceMessage.vehicleid,
                user: selectedServiceMessage.user
            }
        createNewToMessage(info);
        this.forceUpdate();
  }

  handleChange = (e) => {
      getSelectedMessageText(e.target.value)
  }

  goBack() {
    const { history } = this.props
    history.go(-1)
  }

  render() {
    const { getSelectedMessageText, selectedMessageText, createNewToMessage, selectedServiceMessage } = this.props
    console.log(createNewToMessage);
    const newText = "akjshdkjashdkjahsdkhasdkj"
    console.log(this.props)

    return (
      <div>
          {this.displayOverlay()}
        <MessengerContainer>
            <MessengerContainerTop>
                <StyledBackIcon
                    onClick={() => this.goBack()}
                >
                    <SVG src={arrowleftw} />
                </StyledBackIcon>
                <MessengerTopText>
                    <Text
                        white35
                        padding="25px 0"
                    >
                        Current Vehicles
                    </Text>
                </MessengerTopText>
                <MessengerSearchBar 
                    width="85%"
                    placeholder="Search..."
                />
            </MessengerContainerTop>
            {this.renderChatCells()}
        </MessengerContainer>
        <MessengerChatContainer>
            <MessengerChatTopSec>
                {this.renderServiceId()}
            </MessengerChatTopSec>
            <ChatMessagesContainer>
                {this.renderChatMessages()}
            </ChatMessagesContainer>
            <MessengerFixedBottom>
                <BottomLeftButton
                    onClick={() => this.toggleTemplateTrue()}
                >
                    <SVG src={templatey} />
                </BottomLeftButton>
                <BottomMiddleText>
                    <form method="POST" onChange={this.handleChange} onSubmit={(e) => this.sendNewMessage(e, this)}>
                        <MessengerSearchBar 
                            width="97%"
                            placeholder="Enter Messege..."
                            value={selectedMessageText}
                            name="toMessage"
                        />
                    </form>
                </BottomMiddleText>
                <BottomRightButton>
                    <SVG src={senddb} />
                </BottomRightButton>
            </MessengerFixedBottom>
        </MessengerChatContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  realCustomers: state.realCustomers,
  selectedCustomer: state.environment.selectedCustomer,
  activeServices: state.activeServices,
  selectedServiceMessage: state.environment.selectedServiceMessage,
  selectedMessageText: state.environment.selectedMessageText,
  showTemplateOverlay: state.environment.showTemplateOverlay,
  state: state
})

const dispatchToProps = (dispatch) => ({
   getActiveCustomerServices: () => dispatch(getActiveCustomerServices()),
   getSelectedServiceMessage: (sm) => dispatch(getSelectedServiceMessage(sm)),
   getSelectedMessageText: (text) => dispatch(getSelectedMessageText(text)),
   toggleTemplateOverlay: (status) => dispatch(toggleTemplateOverlay(status)),
   getCustomerActiveToMessages: (status) => dispatch(getCustomerActiveToMessages)
})

export default connect(mapStateToProps, dispatchToProps)(ChatMessenger);