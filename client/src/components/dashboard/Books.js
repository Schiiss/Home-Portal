import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBook } from "../../actions/profileActions";

class Book extends Component {
  onDeleteClick(id) {
    this.props.deleteBook(id);
  }

  render() {
    const books = this.props.books.map(books => (
      <tr key={books._id}>
        <td>{books.title}</td>
        <td>{books.author}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, books._id)}
            className="btn btn-danger"
          >
            Delete Book
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Books</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th />
            </tr>
            {books}
          </thead>
        </table>
      </div>
    );
  }
}

Book.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(Book);
