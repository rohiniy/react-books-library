import React, { Component } from "react";
import PropTypes from "prop-types";
import { Hiring } from "./Hiring";
import { NotHiring } from "./NotHiring";
import { Book } from "./Book";

class Library extends Component {
  // This will be used if this.props.books is not passed from render function.
  static defaultProps = {
    books: [{ title: "Default Title", author: "Default Author", pages: 230 }]
  };
  state = {
    open: true,
    freeBookmark: true,
    hiring: true,
    data: [],
    loading: false
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    fetch("https://hplussport.com/api/products/order/price/sort/asc/qty/1")
      .then(data => data.json())
      .then(data => this.setState({ data, loading: false }));
  };
  toggleOpenClose = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { books } = this.props;
    let currentState = this.state.open ? "open" : "closed";
    return (
      <div>
        {this.state.hiring ? <Hiring /> : <NotHiring />}
        <h1>The Library is {currentState}</h1>
        <button onClick={this.toggleOpenClose}> Change</button>
        {this.state.loading ? (
          "LOADING..."
        ) : (
          <div>
            {this.state.data.map(product => {
              return (
                <div key={product.id}>
                  <h3>Library product of the day: {product.name}</h3>
                  <img alt={product.name} src={product.image} height={100} />
                </div>
              );
            })}
          </div>
        )}
        {books.map((book, i) => (
          <Book
            key={i}
            title={book.title}
            author={book.author}
            pages={book.pages}
            freeBookmark={this.state.freeBookmark}
          />
        ))}
      </div>
    );
  }
}

Library.propTypes = {
  books: PropTypes.array
};

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  pages: PropTypes.number,
  freeBookmark: PropTypes.bool
};

export default Library;
