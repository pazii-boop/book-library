import React from "react";

const BookDetails = ({ book, addToReadBooks }) => {
  // Get the book cover URL (if available)
  const coverUrl = book.cover
    ? book.cover.medium
    : "https://via.placeholder.com/150"; // Placeholder if no cover exists

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      {/* Show the book cover image */}
      <img
        src={coverUrl}
        alt={`${book.title} cover`}
        style={{ width: "200px", height: "auto" }} // Optional styling to control the image size
      />
      <p>
        <strong>Author:</strong>{" "}
        {book.authors?.map((a) => a.name).join(", ") || "Unknown"}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {book.description || "No description available"}
      </p>
      <p>
        <strong>Publisher:</strong> {book.publishers?.[0]?.name || "Unknown"}
      </p>
      <p>
        <strong>Publication Date:</strong> {book.publish_date || "Unknown"}
      </p>
      <button onClick={() => addToReadBooks(book)}>Mark as Read</button>
    </div>
  );
};

export default BookDetails;
