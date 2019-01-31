import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PropTypes from "prop-types";

let Booklist = [
  { title: "Title1", author: "author1" },
  { title: "Title2", pages: 340 },
  { title: "Title3", author: "author3", pages: 640 }
];

const Hiring = () => {
  return <p>Library is hiring. Visit "www.library.com" for more information</p>;
};
const NotHiring = () => {
  return (
    <p>Library is not hiring. Please come back later for more information.</p>
  );
};

// Passing default values to the variables if not passed by calling function
const Book = ({
  title = "Default Title from function",
  author = "No Author",
  pages = 0,
  freeBookmark = false
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>by : {author} </p>
      <p>Pages: {pages}</p>
      <p>FreeBookmark: {freeBookmark ? "yes" : "no"}</p>
    </section>
  );
};

class Library extends React.Component {
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
  freeBookmark: PropTypes.boolean
};
ReactDOM.render(<Library books={Booklist} />, document.getElementById("root"));
