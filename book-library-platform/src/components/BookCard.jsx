import React from "react";

const BookCard = ({ book, addToReadBooks, handleBookSelect }) => {
  // Construct the cover image URL using Open Library's cover image endpoint
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover"; // Fallback for books without a cover

  return (
    <div className="book-card">
      {/* Display the book cover */}
      <img src={coverUrl} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <p>Author: {book.author_name?.join(", ") || "Unknown"}</p>
      <button onClick={() => handleBookSelect(book.key)}>Open Book</button>
      <button onClick={() => addToReadBooks(book)}>Add to Read Books</button>
    </div>
  );
};

export default BookCard;
