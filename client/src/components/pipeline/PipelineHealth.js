import React, { Component } from "react";
import { connect } from "react-redux";
import { viewPipeline } from "../../actions/profileActions";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

class PipelineHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pipeline: ""
    };
  }

  componentDidMount() {
    this.props.viewPipeline();
  }

  render() {
    const pipeline = this.props.pipeline;
    let pipelineContent;
    const allowed = ["attributes"];

    if (pipeline === null) {
      pipelineContent = <Spinner />;
    } else {
      var filteredPipeline = Object.keys(pipeline)
        .filter(key => key !== "attributes")
        .reduce(
          (filteredPipeline, currKey) => (
            (filteredPipeline[currKey] = pipeline[currKey]), filteredPipeline
          ),
          {}
        );
    }
    //REMOVE THIS. FOR DEBUGGING
    console.log(filteredPipeline);

    if (pipeline === null) {
      pipelineContent = <Spinner />;
    } else {
      pipelineContent = Object.keys(filteredPipeline).map(currKey => {
        return (
          <div key={currKey} className="card card-body mb-2">
            <h1>
              {currKey}: {pipeline[currKey]}
            </h1>
          </div>
        );
      });
    }
    return (
      <div className="pipelines">
        <div className="container">
          <div className="row">
            <div ref="myRef">
              <hr />
              <h3 className="col-mb-12">Pipeline Metrics</h3>
              {pipelineContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pipeline: state.profile.pipeline,
  errors: state.errors
});

export default connect(mapStateToProps, { viewPipeline })(
  withRouter(PipelineHealth)
);
