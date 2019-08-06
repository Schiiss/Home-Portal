import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const movieData = {
      title: this.state.title,
      genre: this.state.genre
    };

    this.props.addMovies(movieData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select Genre", value: 0 },
      { label: "Action", value: "Action" },
      { label: "Horror", value: "Horror" },
      { label: "Documentaries", value: "Documentaries" }
    ];
    return (
      <div className="add-movies">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Movies</h1>
              <p className="lead text-center">
                Add a movie you are interested in
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="The title of the movie you are looking for"
                />
                <SelectListGroup
                  placeholder="* Genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.onChange}
                  options={options}
                  error={errors.genre}
                  info="Select the genre"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddMovies.propTypes = {
  addMovies: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMovies }
)(withRouter(AddMovies));
