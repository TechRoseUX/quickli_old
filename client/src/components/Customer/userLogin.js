import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {userLogin} from '../../store/actions/customer'
import './customers.css';

class UserLogin extends Component {

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    resSend: PropTypes.string.isRequired
  }

  static defaultProps = {
    resSend: ''
  }

  componentWillMount() {
    this.props.userLogin();
  }

  render() {

    return (
      <div>
        <h2>Res Send User Login</h2>
        <p>{this.props.resSend}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resSend: state.resSend
})

const dispatchToProps = (dispatch) => ({
   userLogin: () => dispatch(userLogin())
})

export default connect(mapStateToProps, dispatchToProps)(UserLogin);