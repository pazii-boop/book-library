import React from "react";

const BookDetails = ({ book, addToReadBooks }) => {
  const openLibraryURL = `https://openlibrary.org${book.key}`;

  return (
    <div className="book-details">
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "default_cover.jpg"
        }
        alt={book.title}
        className="book-cover"
      />
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="book-publisher">
        Publisher: {book.publisher ? book.publisher.join(", ") : "Unknown"}
      </p>
      <p className="book-published">
        Published: {book.first_publish_year || "Unknown"}
      </p>
      <button onClick={() => addToReadBooks(book)}>Add to Read Books</button>
      <a
        href={openLibraryURL}
        target="_blank"
        rel="noopener noreferrer"
        className="read-book-link"
      >
        Read this Book
      </a>
    </div>
  );
};

export default BookDetails;
