"use client";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-72">
      <Link href={`/${book.id}`}>
        <div className="cursor-pointer">
          {book.cover && (
            <Image
              src={book.cover}
              alt={book.title}
              height={100}
              width={100}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
          )}
          <h2 className="text-lg font-semibold text-gray-800">{book.title.slice(0,40)}{book?.title?.length > 40 ? "..." : ""}</h2>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>
      </Link>
    </div>
  );
}