import React, { Component } from "react";

import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";

/**
 * Navigation Bar component.
 */
class Nav extends Component {
  /**
   * Render the Logout Component when a user is authenticated. This renders a
   * button to log out the currently authenticated user.
   * Otherwise display the Login and Register Components and render matching buttons.
   * The Login button initiates the Authorization Code Flow.
   * The Register button redirects the user to an endpoint of keycloak with a
   * register form. The form can be configured in keycloak. The default form
   * includes inter alia username, password and name.
   * Logout, login, and registration are initiated by functions from the
   * keycloak adapter.
   */
  loginOrLogout = () => {
    if (this.props.authorized) {
      return (
        <React.Fragment>
          <Logout />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Login />
          <Register />
        </React.Fragment>
      );
    }
  };

  /**
   * Renders the Nav component.
   */
  render() {
    return (
      <nav id="top">
        <div className="nav-wrapper light-red lighten-2">
          <div className="container">
            <span className="brand-logo grey-text text-darken-4">
              SSO Example
            </span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.loginOrLogout()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
