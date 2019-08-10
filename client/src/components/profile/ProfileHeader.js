import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div class="profile-top bg-primary p-2">
        <h1 class="large">{profile.user.name}</h1>
        <p class="lead">{profile.handle}</p>
        <p>Calgary, AB</p>
        <div class="icons my-1">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x" />
          </a>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
