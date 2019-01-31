import React from "react";

// Passing default values to the variables if not passed by calling function
export const Book = ({
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
