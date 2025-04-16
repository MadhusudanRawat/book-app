"use client";
import Link from "next/link";
import { useState } from "react";

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
  });
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const { data, message } = await res.json();

      if (!res.ok || !data) {
        throw new Error(message || "Something went wrong");
      }

      setBooks((prev) => [data, ...prev]);
      setFormData({ title: "", author: "", cover: "" });
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        name="cover"
        placeholder="Cover Image URL (optional)"
        value={formData.cover}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      {message && <p className="text-red-500 mb-3">{message}</p>}

      <div className="flex justify-between items-center mb-4">
        <Link
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
          href="/"
        >
          Back
        </Link>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Add Book
        </button>
      </div>

      {/* Book List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-700">by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
