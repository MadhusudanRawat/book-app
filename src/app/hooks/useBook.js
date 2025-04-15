"use client";
import { useState } from "react";

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAllBooks = async () => {
    try {
      const res = await fetch(`/api/books`);
      const { data, message } = await res.json();

      setBooks(data || []);
      setMessage(message || (data?.length === 0 ? "No results found." : ""));
    } catch (err) {
      setBooks([]);
      setMessage("Failed to fetch books.");
    }
  };

  const searchBooks = async (query) => {
    try {
      const res = await fetch(`/api/books?q=${query}`);
      const { data, message } = await res.json();
      setBooks(data || []);
      setMessage(message || (data?.length === 0 ? "No results found." : ""));
    } catch (err) {
      setBooks([]);
      setMessage("Search failed.");
    }
  };

  return {
    books,
    setBooks,
    message,
    fetchAllBooks,
    searchBooks,
  };
}
