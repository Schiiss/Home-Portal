import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            classname="nav-link"
          >
            <h1 alt={user.name} />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="profiles.html">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code" /> Home Portal
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
