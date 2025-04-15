"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const res = await fetch(`/api/books/${id}`);
        const { data, message } = await res.json();

        if (!res.ok || !data) {
          throw new Error(message || "Book not found");
        }

        setBook(data);
      } catch (err) {
        setError(err.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!book) {
    return (
      <p className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        Book not found
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="p-5">
        <Link className="text-blue-500 hover:underline" href={"/"}>
          Back
        </Link>
      </div>
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-2 text-lg">Author: {book.author}</p>
      <p className="text-sm text-gray-500">Book ID: {book.id}</p>
    </div>
  );
}
