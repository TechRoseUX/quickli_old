import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getRealCustomers} from '../../store/actions/customer'
import './customers.css';

import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Colors from '../constants/colors';

import { getSelectedCustomer, updateCustomerSearch, getCurrentFilter } from '../../store/reducers/environment';
import CustomerCellRow from './CustomerCellRow';
import userb from '../../rersources/svg/userb.svg';
import lockb from '../../rersources/svg/lockb.svg';
import barsw from '../../rersources/svg/barsw.svg';
import { NewDiv, MainBG, MainHeading } from './Styled/StyledComponents';
import Button from './Styled/Button';
import Text from './Styled/Text';

const CustomerSearchBar = styled.input`
    @media ${device.tablet} {
        width: 100%;
        height: 100%;
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
      color: ${Colors.lightGray};
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
    const {showNavBar, toggleNavBar, toggleNavToggle } = this.props
    if (showNavBar === 'block') {
      toggleNavBar('none')
      toggleNavToggle(barsw);
    } else {
      console.log('Not showing....');
    }
  }

  searchCustomers = (event) => {
    const { search, updateCustomerSearch } = this.props
    var searchText = event.target.value
    updateCustomerSearch(searchText)

    var s = document.getElementById('search-select');
    var strSelect = s.options[s.selectedIndex].value

    console.log(strSelect)
  }

  updateFilter = (event) => {
    const { getCurrentFilter } = this.props
    var cFilter = event.target.value
    getCurrentFilter(cFilter)
    console.log(cFilter)
  }

  renderRows = () => {
    const { realCustomers, selectedCustomer, getSelectedCustomer, history, search, currentFilter } = this.props
    console.log(selectedCustomer);

    const realCustomersReversed = realCustomers.reverse()

    var filteredCustomers;

    if (currentFilter === 'Name') {
      if (search === null || search === '') {
        filteredCustomers = realCustomersReversed
      } else {
        filteredCustomers = realCustomersReversed.filter((item) => {
          var name = item.name.toLowerCase()
          var filterVal = search.toLowerCase();
          var n = name.match(filterVal)
          if (n != null) {
            return true
          }
        })
      }
      
    } else if (currentFilter === 'Phone Number') {
      if (search === null || search === '') {
        filteredCustomers = realCustomersReversed
      } else {
        filteredCustomers = realCustomersReversed.filter((item) => {
          var number = item.phoneNumber1.toLowerCase()
          var filterVal = search.toLowerCase();
          var n = number.match(filterVal)
          if (n != null) {
            return true
          }
        })
      }
    } else if (currentFilter === 'Email') {
      if (search === null || search === '') {
        filteredCustomers = realCustomersReversed
      } else {
        filteredCustomers = realCustomersReversed.filter((item) => {
          var email = item.email.toLowerCase()
          var filterVal = search.toLowerCase();
          var n = email.match(filterVal)
          if (n != null) {
            return true
          }
        })
      }
    } else {
      filteredCustomers = realCustomersReversed
    }

    return filteredCustomers.map((d) => {
      console.log(filteredCustomers);
      console.log(currentFilter)
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
    const { realCustomers, updateCustomerSearch, search } = this.props

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
            onChange={this.searchCustomers}
            value={search}
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
              <StyledSelect 
              id="search-select"
              onChange={this.updateFilter}
              >
                <option>Name</option>
                <option>Phone Number</option>
                <option>Email</option>
                <option>Vin Number</option>
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
  search: state.environment.search,
  currentFilter: state.environment.currentFilter,
  state: state
})

const dispatchToProps = (dispatch) => ({
   getRealCustomers: () => dispatch(getRealCustomers()),
   getSelectedCustomer: (customer) => dispatch(getSelectedCustomer(customer)),
   updateCustomerSearch: (search) => dispatch (updateCustomerSearch(search)),
   getCurrentFilter: (filter) => dispatch (getCurrentFilter(filter))
})

export default connect(mapStateToProps, dispatchToProps)(AllCustomers);