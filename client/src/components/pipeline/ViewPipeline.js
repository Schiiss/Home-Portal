import React, { Component } from "react";
import PipelineHealth from "./PipelineHealth";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ViewPipeline extends Component {
  render() {
    const { pipeline } = this.props.profile;
    let pipelineContent;

    pipelineContent = (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to="/view-pipelines"
              className="btn btn-light mb-3 float-left"
            >
              Back to pipelines
            </Link>
          </div>
        </div>
        <PipelineHealth />
      </div>
    );

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-20">{pipelineContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ViewPipeline.propTypes = {
  pipeline: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  pipeline: state.profile.pipeline
});

export default connect(mapStateToProps, {})(ViewPipeline);
