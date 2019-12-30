import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { viewPipelines } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ViewPipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pipelines: []
    };
  }

  componentDidMount() {
    this.props.viewPipelines();
  }

  render() {
    const pipelineItems = this.props.pipelines.map(pipeline => (
      <div key={pipeline.id} className="card card-body mb-2">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <Link
                  to={`/view-pipeline/${pipeline.pipelineId}`}
                  className="btn btn-info"
                >
                  {pipeline.title}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="pipelines">
        <div className="container">
          <div className="row">
            <div ref="myRef">
              <hr />
              <h3 className="col-mb-12">Streamsets Pipelines</h3>
              {pipelineItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pipelines: state.profile.pipelines,
  errors: state.errors
});

export default connect(mapStateToProps, { viewPipelines })(
  withRouter(ViewPipelines)
);
