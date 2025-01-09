// Import necessary libraries and components
import React, { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);

  // Handles the search operation
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setBooks(data.docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToReadBooks = (book) => {
    if (!readBooks.some((readBook) => readBook.key === book.key)) {
      setReadBooks((prevReadBooks) => [...prevReadBooks, book]);
    }
  };

  const handleBookSelect = async (bookKey) => {
    setSelectedBook(null);
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&format=json&jscmd=data`
    );
    const data = await response.json();
    const bookDetails = data[`OLID:${bookKey}`];
    setSelectedBook(bookDetails);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <section className="results">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  addToReadBooks={addToReadBooks}
                  handleBookSelect={handleBookSelect}
                />
              ))}
            </section>
          </>
        );
      case "about":
        return <About />;
      case "readBooks":
        return (
          <div className="read-books">
            <h2>Your Read Books</h2>
            <section className="results">
              {readBooks.map((book) => (
                <div className="book-card" key={book.key}>
                  <img
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                        : "default_cover.jpg"
                    }
                    alt={book.title}
                    className="book-cover"
                  />
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author_name?.join(", ")}</p>
                </div>
              ))}
            </section>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Book Library</h1>
        <nav>
          <ul>
            <li>
              <button onClick={() => setCurrentPage("home")}>Home</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("about")}>About</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("readBooks")}>
                Read Books
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <main className="main">
        {selectedBook ? (
          <BookDetails book={selectedBook} addToReadBooks={addToReadBooks} />
        ) : (
          renderPage()
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Book Library. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
