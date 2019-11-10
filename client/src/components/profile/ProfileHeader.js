import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="profile-top bg-primary p-2">
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.handle}</p>
        <p>Calgary, AB</p>
      </div>
    );
  }
}

export default ProfileHeader;
