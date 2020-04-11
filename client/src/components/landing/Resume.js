import React, { Component } from "react";

class Resume extends Component {
  render() {
    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var skills = this.props.data.skills.map(function (skills) {
        var projectImage = "images/" + skills.image;
        return (
          <div key={skills.name} className="columns feature-item">
            <img className="skill" alt={skills.name} src={projectImage} />
            <h5>{skills.name}</h5>
            <p>{skills.description}</p>
          </div>
        );
      });
    }

    return (
      <section id="resume">
        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Features</span>
            </h1>
          </div>

          <div>
            <div className="nine columns main-col">
              <p className="lead center">{skillmessage}</p>
            </div>
            <ul className="bgrid-quarters s-bgrid-thirds cf">{skills}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
