import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getRealCustomers} from '../../store/actions/customer'
import './customers.css';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { getSelectedCustomer } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';

const CustomerSearchBar = styled.input`
    @media ${device.tablet} {
        width: 100%;
        height: 100%;
        background-color: #FFFFF;
        margin: 0 auto;
        padding-left: 10px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
    } 
`

const CustomerSearchSelectSec = styled(NewDiv)`
    @media ${device.tablet} {
      width: 672px;
      margin: 0 auto;
      margin-top: 30px;
    } 
`

const SearchNameBox = styled(NewDiv)`
    @media ${device.tablet} {
      text-align: left;
      width: 242px;
      display: inline-block;
    }
`

const NameSelectDiv = styled(NewDiv)`
    @media ${device.tablet} {
      width: 242px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;

      select {
        outline: none;
        border: 0px;
      }
    } 
`

const StyledSelect = styled.select`
    @media ${device.tablet} {
      width: 100%;
      height: 100%
      font-size: 16px;
      color: grey;
      -webkit-border-top-right-radius: 15px;
      -webkit-border-bottom-right-radius: 15px;
      -moz-border-radius-topright: 15px;
      -moz-border-radius-bottomright: 15px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
`

const SearchButton = styled(NewDiv)`
    @media ${device.tablet} {
      width: 156px;
      height: 40px;
      display: inline-block;
      float: right;
      margin-top: 30.5px;
    }
`

const AllCsBG = styled(NewDiv)`
    @media ${device.tablet} {
      width: 100%;
      background: rgb(0,142,204);
      background: linear-gradient(90deg, rgba(0,142,204,1) 0%, rgba(89,200,248,1) 100%);
      height: 300px;
    }
`

class AllCustomers extends Component {

  static propTypes = {
    getRealCustomers: PropTypes.func.isRequired,
    realCustomers: PropTypes.array.isRequired
  }

  static defaultProps = {
    realCustomers: []
  }

  componentDidMount() {
    this.props.getRealCustomers();
  }

  renderRows = () => {
    const { realCustomers, selectedCustomer, getSelectedCustomer, history } = this.props
    console.log(selectedCustomer);

    return realCustomers.map((d) => {
      console.log(realCustomers);
      return (
        <CustomerCellRow
          key={d.customerid}
          realCustomers={realCustomers}
          selectedCustomer={selectedCustomer}
          getSelectedCustomer={getSelectedCustomer}
          history={history}
          {...d}
        />
      )
    })
  }

  render() {
    const realCustomers = this.props.realCustomers

    return (
      <div>
        <AllCsBG>
          <MainHeading>
              <Text
                mainHeading
                padding="30px 0 50px 0"
              >
                All Customers
              </Text>
            </MainHeading>
        <NewDiv
          width="662px"
          height="40px"
        >
          <CustomerSearchBar 
            placeholder="Search"
          />
        </NewDiv>
        <CustomerSearchSelectSec>
          <SearchNameBox
            float="left"
          >
            <Text
              padding="0 0 15px 0"
            >
              Search By:
            </Text>
            <NameSelectDiv>
              <StyledSelect>
                <option>Name</option>
              </StyledSelect>
            </NameSelectDiv>
          </SearchNameBox>
          <SearchNameBox>
            <Text
              padding="0 0 15px 0"
            >
              Filter By:
            </Text>
            <NameSelectDiv>
              <StyledSelect>
                <option>A-Z</option>
              </StyledSelect>
            </NameSelectDiv>
          </SearchNameBox>
          <SearchButton>
            <Button
              width="100%"
              height="100%"
              borderRadius="40px"
              standardBtn
            >
              <Text
              >
                Search
                </Text>
            </Button>
          </SearchButton>
        </CustomerSearchSelectSec>
      </AllCsBG>
        <NewDiv
          width="100vw"
        >
            {this.renderRows()}
        </NewDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  realCustomers: state.realCustomers,
  selectedCustomer: state.environment.selectedCustomer,
  state: state
})

const dispatchToProps = (dispatch) => ({
   getRealCustomers: () => dispatch(getRealCustomers()),
   getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer))
})

export default connect(mapStateToProps, dispatchToProps)(AllCustomers);