import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Library from "./Library";

let Booklist = [
  { title: "Title1", author: "author1" },
  { title: "Title2", pages: 340 },
  { title: "Title3", author: "author3", pages: 640 }
];

ReactDOM.render(<Library books={Booklist} />, document.getElementById("root"));
