import React, { Component } from "react";

class About extends Component {
  render() {
    if (this.props.data) {
      var profilepic = "images/" + this.props.data.image;
      var about = this.props.data.about;
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src={profilepic}
              alt="Conner Schiissler Profile Pic"
            />
          </div>
          <div className="nine columns main-col">
            <h2>About The Site</h2>

            <p>{about}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
