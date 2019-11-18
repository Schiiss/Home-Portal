import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //Get First Name
    const firstName = profile.user.name.trim().split(" ");

    //Interests List
    const interests = profile.interests.map((interest, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {interest}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{firstName}'s Bio</h2>
            <p className="lead">
              {isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}
            </p>
            <div className="line" />
            <h2 className="text-primary">Interests</h2>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {interests}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
