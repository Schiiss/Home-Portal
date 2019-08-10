import React, { Component } from "react";

class ProfileInterests extends Component {
  render() {
    const { movies, books } = this.props;
    const movieItems = movies.map(movies => (
      <li key={movies._id} className="list-group-item">
        <h4>{movies.title}</h4>
        <h4>{movies.genere}</h4>
      </li>
    ));
    const bookItems = books.map(books => (
      <li key={books._id} className="list-group-item">
        <h4>{books.title}</h4>
        <h4>{books.author}</h4>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Movies</h3>
          {movieItems.length > 0 ? (
            <ul className="list-group">{movieItems}</ul>
          ) : (
            <p className="text-center">No movies added</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Books</h3>
          {bookItems.length > 0 ? (
            <ul className="list-group">{bookItems}</ul>
          ) : (
            <p className="text-center">No books added</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileInterests;
