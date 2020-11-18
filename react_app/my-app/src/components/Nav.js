import React, { Component } from 'react';

import Login from './Login'
import Register from './Register'
import Logout from './Logout'

class Nav extends Component {

  loginOrLogout = () => {
    if (this.props.authorized) {
      return <React.Fragment><Logout/></React.Fragment>
    } else {
      return <React.Fragment>
        <Login/>
        <Register/>
      </React.Fragment>
    }
  }

  render() {
    return (
      <nav id="top">
        <div className="nav-wrapper light-green lighten-2">
          <div className="container">
            <span className="brand-logo grey-text text-darken-4">SSO Example</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.loginOrLogout()}
            </ul>
          </div>
        </div>
      </nav>
    )}
}

export default Nav;