import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="profile-top bg-primary p-2">
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.handle}</p>
        <p>Calgary, AB</p>
        <div className="icons my-1">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
