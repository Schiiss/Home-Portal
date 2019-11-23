import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMovie } from "../../actions/profileActions";

class Movies extends Component {
  onDeleteClick(id) {
    this.props.deleteMovie(id);
  }

  render() {
    const movies = this.props.movies.map(movies => (
      <tr key={movies._id}>
        <td className="dark-mode">{movies.title}</td>
        <td className="dark-mode">{movies.genre}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, movies._id)}
            className="btn btn-danger"
          >
            Delete Movie
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Movies</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th />
            </tr>
            {movies}
          </thead>
        </table>
      </div>
    );
  }
}

Movies.propTypes = {
  deleteMovie: PropTypes.func.isRequired
};

export default connect(null, { deleteMovie })(Movies);
