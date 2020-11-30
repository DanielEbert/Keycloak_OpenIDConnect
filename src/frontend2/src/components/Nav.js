import React, { Component } from 'react';

import Login from './Login'
import Register from './Register'
import Logout from './Logout'

class Nav extends Component {

  loginOrLogout = () => {
    // Render the Logout Component if a user is authenticated. This renders a
    // Button to log out the currently authenticated user.
    // Otherwise display the Login and Register Components. Again, both render a
    // Button. The Login button initiates the Authorization Code Flow.
    // The Register Button redirects the user to an endpoint of keycloak with a 
    // register form. The form can be configured in keycloak. The default form
    // includes inter alia username, password and name.
    // Logout, login, and registration are initiated via functions from the
    // keycloak adapter.
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
        <div className="nav-wrapper light-red lighten-2">
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
