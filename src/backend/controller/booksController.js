const { searchSchema, bookSchema } = require("../joiValidations/searchApi");
import bookStore from "@/backend/model/bookStore.json";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/backend/model/bookStore.json");

const getResponse = ({
  statusCode = 500,
  success = false,
  message = "Internal server error",
  data = null,
}) => ({
  statusCode,
  success,
  message,
  data,
});

const getBookList = async () => {
  try {
    return {
      error: false,
      response: getResponse({
        statusCode: 200,
        success: true,
        message: "Book list fetched successfully",
        data: bookStore,
      }),
    };
  } catch (error) {
    return {
      error: true,
      response: getResponse({ message: error.message }),
    };
  }
};

const searchBooks = async (q) => {
  try {
    const { error, value } = await searchSchema.validate({ q });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const query = value.q.toLowerCase();
    const results = bookStore.filter((book) =>
      book.title?.toLowerCase().includes(query)
    );

    if (!results.length) {
      throw new Error("No books found");
    }

    return {
      error: false,
      response: getResponse({
        statusCode: 200,
        success: true,
        message: "Books found successfully",
        data: results,
      }),
    };
  } catch (error) {
    return {
      error: true,
      response: getResponse({ message: error.message }),
    };
  }
};

const readSingleBookDetails = async (id) => {
  try {
    if (!id) throw new Error("Invalid argument");
    console.log(id);
    
    const book = bookStore.find((b) => b.id === id);

    if (!book) throw new Error("Book not found");

    return {
      error: false,
      response: getResponse({
        statusCode: 200,
        success: true,
        message: "Book found successfully",
        data: book,
      }),
    };
  } catch (error) {
    return {
      error: true,
      response: getResponse({ message: error.message }),
    };
  }
};

const addNewBookInStore = async (body) => {
  const { error, value } = bookSchema.validate(body);

  if (error) {
    return getResponse({
      statusCode: 400,
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(data);

    const newBook = {
      id: `${Math.floor(Math.random() * 900000) + 100000}`,
      title: value.title,
      author: value.author,
      cover: value.cover || "",
    };

    books.unshift(newBook);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");

    return getResponse({
      statusCode: 201,
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (err) {
    console.log(err);
    
    return getResponse({
      statusCode: 500,
      success: false,
      message: "Failed to add book",
    });
  }
};
module.exports = {
  getBookList,
  searchBooks,
  readSingleBookDetails,
  addNewBookInStore
};
