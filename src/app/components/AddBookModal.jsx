"use client";
import { useState } from "react";

export default function AddBookModal({ isOpen, onClose, onBookAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
  });
  const [message, setMessage] = useState("");

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
        throw new Error(message || "Book not found");
      }
      setFormData({
        title: "",
        author: "",
        cover: "",
      });
      //   onBookAdded(); // Refresh book list
      onBookAdded((prevBooks) => [data, ...prevBooks]);
      onClose(); // Close modal
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

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

        {message && <p className="text-red-500 mb-2">{message}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
