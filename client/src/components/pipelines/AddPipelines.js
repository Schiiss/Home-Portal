import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { addPipelines } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddPipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pipelines: []
    };
  }

  componentDidMount() {
    fetch(`http://192.168.2.135:32784/rest/v1/pipelines`, {
      headers: new Headers({
        Authorization: "Basic " + Buffer.from("admin:admin").toString("base64")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ pipelines: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { pipelines } = this.state;

    const pipelineMetrics = pipelines.map(pipeline => (
      <div key={pipeline.id} className="card card-body mb-2">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <a
                  href={
                    `http://192.168.2.135:32784/collector/pipeline/` +
                    pipeline.pipelineId
                  }
                  rel={"external"}
                  className="text-info"
                  target="_blank"
                >
                  {pipeline.title}
                </a>
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
              {pipelineMetrics}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addPipelines })(
  withRouter(AddPipelines)
);
