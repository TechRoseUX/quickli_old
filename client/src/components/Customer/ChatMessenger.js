import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getActiveCustomerServices, getCustomerActiveToMessages} from '../../store/actions/customer'
import { createNewToMessage } from '../../store/actions/customer'
import './customers.css';
import StyledOverlayTemplate from '../Customer/Styled/StyledOverlayTemplate';
import StyledOverlayEndService from '../Customer/Styled/StyledOverlayEndService';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../constants/colors';

import { getSelectedCustomer, getSelectedServiceMessage, getSelectedMessageText, toggleTemplateOverlay, toggleEndServiceOverlay, getCurrentFilter, updateCustomerSearch } from '../../store/reducers/environment';
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
        width: 40%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: scroll;
        background: ${Colors.lightBlue};
        float: left;
    }

    @media ${device.tabletL} {
        width: 35%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: auto;
        background: ${Colors.lightBlue};
        float: left;
    }
`

const MessengerContainerTop = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100%;
        height: 200px;
        background: ${Colors.lightBlue};
        border-bottom: 1px solid ${Colors.fullWhite};
        padding-bottom: 8px;
    }
    @media ${device.tabletL} {
        width: 100%;
        height: 200px;
        background: ${Colors.lightBlue};
        border-bottom: 1px solid ${Colors.fullWhite};
    }
`

const MessengerTopText = styled(NewDiv)`
    @media ${device.tablet} {
        max-width: 300px;
        text-align: center;
        height: auto;
        padding-top: 24px;
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
        height: ${props => (props.height || '40px')};
        background-color: ${Colors.fullWhite};
        margin: 0 auto;
        padding-left: 10px;
        font-size: 16px;
        border: none;
        border-radius: 20px;

        :focus {
            outline: none;
          }
    } 
`

const MessengerTextBox = styled.textarea`
    @media ${device.tablet} {
        width: ${({ width }) => (width|| '100%')};
        height: 90px;
        background-color: ${Colors.fullWhite};
        margin: 0 auto;
        padding-left: 10px;
        padding-top: 10px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
        :focus {
            outline: none;
          }
    } 
`

const MessengerChatContainer = styled(NewDiv)`
    @media ${device.tablet} {
        width: 60%;
        height: 100vh;
        background-color: ${Colors.lighterGray};
        float: right
    } 
    @media ${device.tabletL} {
        width: 65%;
        height: 100vh;
        background-color: ${Colors.lighterGray};
        float: right
    } 
`

const MessengerChatTopSec = styled(NewDiv)`
    @media ${device.tablet} {
        width: 60%;
        height: 90px;
        background-color: ${Colors.lighterGray};
        border-bottom: 1px solid ${Colors.lightBlue};
        position: fixed;
        top: 0;
        text-align: left;
    } 

    @media ${device.tabletL} {
        width: 65%;
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
        width: 60%;
        height: 115px;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    } 

    @media ${device.tabletL} {
        width: 65%;
        height: 115px;
        position: fixed;
        bottom: 0;
    } 
`

const ChatMessagesContainer = styled(NewDiv)`
    @media ${device.tablet} {
        margin-top: 150px;
        background-color: ${Colors.lighterGray};
    }
    
    @media ${device.laptop} {
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
        padding-top: 60px;
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
        padding-top: 60px;

        svg {
            width: 40px;
            height: 40px;
        }
    } 
`

const BottomMiddleText = styled(NewDiv)`
    @media ${device.tablet} {
        width: 80%;
        height: 100px;
        padding: 5px 0;
        display: inline-block;
    } 

    @media ${device.tabletL} {
        width: 80%;
        height: 100px;
        padding: 5px 0;
        display: inline-block;
    } 
`

const ChatToRow = styled(NewDiv)`
    @media ${device.tablet} {
        width: 100%;
        height: auto;
        clear: both;
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
            correctChats: [],
            correctDisplayedMessages: []

        }
    }
  componentDidMount() {
    const {showNavBar, toggleNavBar, toggleNavToggle, getCustomerActiveToMessages, activeToMessages, selectedServiceMessage, getCurrentFilter, updateCustomerSearch } = this.props

    if (showNavBar === 'block') {
        toggleNavBar('none')
        toggleNavToggle(barsw);
        updateCustomerSearch('')
    } else {
        console.log('Not showing....');
        updateCustomerSearch('')
    }

    console.log(this.props)
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
                <StyledOverlayTemplate
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

    displayOverlayEnd = () => {
        const { showEndServiceOverlay, getSelectedMessageText, selectedMesageText, toggleEndServiceOverlay, selectedServiceMessage, history } = this.props
        if (showEndServiceOverlay === true) {
            return (
                <StyledOverlayEndService
                    getSelectedMessageText={getSelectedMessageText} 
                    selectedMesageText={selectedMesageText}
                    toggleEndServiceOverlay={toggleEndServiceOverlay}
                    selectedServiceMessage={selectedServiceMessage}
                    history={history}
              />
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    endService = () => {
        const { toggleEndServiceOverlay } = this.props
        toggleEndServiceOverlay(true)
        console.log('Ending the service....')
    }

  renderChatCells = () => {
    var activeServiceArray = []
    const { customerServices, activeToMessages, getCurrentFilter, search } = this.props
    console.log(customerServices);

    for (var i=0; i < customerServices.length; i++) {
        if (customerServices[i].status == true) {
            activeServiceArray.push(customerServices[i])
        } else {
            console.log('Not active');
        }
    }
    var reversedActiveServiceArray = activeServiceArray.reverse()

    var searchedActiveServices;

    if (search === null || search === '') {
        searchedActiveServices = reversedActiveServiceArray
      } else {
        searchedActiveServices = reversedActiveServiceArray.filter((item) => {
          var name = item.customerName.toLowerCase()
          var filterVal = search.toLowerCase();
          var n = name.match(filterVal)
          if (n != null) {
            return true
          }
        })
      }

        return searchedActiveServices.map((v) => {
            var vMessages = []
            var lastMessage;
            var formattedTime;
            var displayedMessage;

            for (var i=0; i < activeToMessages.length; i++) {
                if (v.serviceid == activeToMessages[i].serviceid) {
                    vMessages.push(activeToMessages[i])
                } else {
                    console.log('Did not match')
                }
            }

            if (vMessages.length > 0) {
                lastMessage = vMessages.slice(-1)[0];
                displayedMessage = lastMessage.textMessage
                var jsTime = lastMessage.date
                var timestamp = jsTime.substring(0, jsTime.length - 3)
                var newDate = new Date(timestamp*1000);
                var fHours = newDate.getHours();
                var fMinutes = '0' + newDate.getMinutes();
                
                var ampm = fHours >= 12 ? 'pm' : 'am';
                fHours = fHours % 12;
                fHours = fHours ? fHours : 12;
                formattedTime = fHours + ':' + fMinutes.substr(-2) + ampm;

            } else {
                formattedTime = '';
                displayedMessage = 'No Messages sent';
            }

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
                            {formattedTime}
                        </Text>
                    </MessageCellContentTop>
                    <MessageCellContentBottom>
                        <Text
                            dblue16
                            ellipsis
                            maxWidth="100%"
                        >
                            {displayedMessage}
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
                <NewDiv>
                    <Text
                        dblue30
                        padding="10px 0 0 10px"
                        inline
                    >
                        {selectedServiceMessage.customerName}
                    </Text>
                    <NewDiv
                        display='inline-block'
                        float='right'
                        margin='15px 15px 0 0'
                    >
                        <Button
                            width='156px'
                            height='40px'
                            borderRadius='20px'
                            backgroundColor={Colors.brightRed}
                            display='inline-block'
                            onClick={this.endService}
                        >
                            <Text
                                white20
                            >
                                End
                            </Text>
                        </Button>
                        
                    </NewDiv>
                </NewDiv>
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
                console.log('Pushed');
            }  else {
                console.log('did not match');
            }  
        }
    }
  }

  renderChatMessages = () => {
    const { activeToMessages, selectedServiceMessage, getCustomerActiveToMessages } = this.props
    const displayedToMessages = []

    this.checkMessageFunc()

      if (selectedServiceMessage) {
        for (var i=0; i < activeToMessages.length; i++) {
            if (activeToMessages[i].serviceid === selectedServiceMessage.serviceid) {
                displayedToMessages.push(activeToMessages[i]);
                console.log(`pushed ${activeToMessages[i]}`);
            }  else {
                console.log('did not match');
            }  
        }
        console.log(this.state);
        console.log(displayedToMessages)
        console.log(activeToMessages)
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
      const { toggleTemplateOverlay, selectedServiceMessage } = this.props
      if (selectedServiceMessage) {
        toggleTemplateOverlay(true);
      } else {
          console.log('There is no selected message');
      }
  }

  sendNewMessage = (e, value) => {
      const { selectedMessageText, createNewToMessage, selectedServiceMessage, getCustomerActiveToMessages, getSelectedMessageText } = this.props
        e.preventDefault();
        console.log(value)
        console.log(selectedMessageText)

        if (selectedServiceMessage) {
            const info =
            {
                textMessage: selectedMessageText,
                phoneNumber: selectedServiceMessage.phoneNumber,
                serviceid: selectedServiceMessage.serviceid,
                vehicleid: selectedServiceMessage.vehicleid,
                customerid: selectedServiceMessage.customerid,
                user: selectedServiceMessage.user
            }
            createNewToMessage(info);
        } else {
            console.log('It cannot be done.')
        }

        setTimeout(getCustomerActiveToMessages, 2000)
        setTimeout(this.renderChatMessages, 3000)
        //window.location.reload()
        getSelectedMessageText('')
  }

  handleChange = (e) => {
      const { getSelectedMessageText } = this.props
      const messageT = e.target.value
      getSelectedMessageText(messageT);
  }

  goBack() {
    const { history } = this.props
    history.go(-1)
  }

  searchMessageCells = (event) => {
    const { search, updateCustomerSearch } = this.props
    var searchText = event.target.value
    updateCustomerSearch(searchText)
  }

  historyAndReload = () => {
    const { history } = this.props
    history.push('/login');
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

  render() {
    const { getSelectedMessageText, selectedMessageText, createNewToMessage, selectedServiceMessage, search } = this.props
    console.log(createNewToMessage);
    const newText = ""
    console.log(this.props)
    const props = this.props
    const data = props && props.auth ? props.auth.data : null;

    if (data) {
        return (
            <div>
                {this.displayOverlay()}
                {this.displayOverlayEnd()}
                <MessengerContainer>
                    <MessengerContainerTop>
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
                            onChange={this.searchMessageCells}
                            value={search}
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
                                <MessengerTextBox
                                    width="97%"
                                    placeholder="Enter Message..."
                                    value={selectedMessageText}
                                    name="toMessage"
                                />
                            </form>
                        </BottomMiddleText>
                        <BottomRightButton 
                        onClick={(e) => this.sendNewMessage(e, this)}>
                            <SVG src={senddb} />
                        </BottomRightButton>
                    </MessengerFixedBottom>
                </MessengerChatContainer>
            </div>
            );
        } else {
            return (
                this.renderNotLoggedIn()
            )
        }
    }
}

const mapStateToProps = (state) => ({
  realCustomers: state.realCustomers,
  selectedCustomer: state.environment.selectedCustomer,
  activeServices: state.activeServices,
  search: state.environment.search,
  selectedServiceMessage: state.environment.selectedServiceMessage,
  selectedMessageText: state.environment.selectedMessageText,
  showTemplateOverlay: state.environment.showTemplateOverlay,
  showEndServiceOverlay: state.environment.showEndServiceOverlay,
  state: state
})

const dispatchToProps = (dispatch) => ({
   getActiveCustomerServices: () => dispatch(getActiveCustomerServices()),
   getSelectedServiceMessage: (sm) => dispatch(getSelectedServiceMessage(sm)),
   getSelectedMessageText: (text) => dispatch(getSelectedMessageText(text)),
   toggleTemplateOverlay: (status) => dispatch(toggleTemplateOverlay(status)),
   toggleEndServiceOverlay: (status) => dispatch(toggleEndServiceOverlay(status)),
   getCustomerActiveToMessages: () => dispatch(getCustomerActiveToMessages()),
   getCurrentFilter: (filter) => dispatch (getCurrentFilter(filter)),
   updateCustomerSearch: (search) => dispatch (updateCustomerSearch(search))
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(ChatMessenger));