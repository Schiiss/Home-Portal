import React, { Component } from "react";
import PipelineHealth from "./PipelineHealth";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewPipeline } from "../../actions/profileActions";

class ViewPipeline extends Component {
  render() {
    const { pipeline } = this.props.profile;
    let pipelineContent;
    const pipelineId = "RESTAPIPOCbbee1180-a38b-4858-9a4b-b95f0fd89e69";

    pipelineContent = (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to="/view-pipelines"
              className="btn btn-light mb-3 float-left"
              onClick={
                (() => viewPipeline(pipelineId), console.log(pipelineId))
              }
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
