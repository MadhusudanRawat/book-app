"use client";
import { useEffect, useState } from "react";

import useBooks from "./hooks/useBook";
import BookCard from "./components/BookCard";
import AddBookModal from "./components/AddBookModal"; // Add this line
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // modal state
  const { books,setBooks, message, fetchAllBooks, searchBooks } = useBooks();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleSearch = async () => {
    if (query.trim()) {
      await searchBooks(query);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    fetchAllBooks();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Book Search</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Search book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
        {query ? (
          <button
            className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        ) : (
          <Link
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            // onClick={() => setShowModal(true)} // open modal
            href={"/add"}
          >
            Add
          </Link>
        )}
      </div>

      {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* <AddBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBookAdded={setBooks}
      /> */}
    </div>
  );
}
