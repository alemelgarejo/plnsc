import type { NextPage } from "next";
import { useState, useEffect } from "react";
import * as React from "react";
import { Book } from "../interfaces/Book";
import { useRouter } from "next/router";

interface Books {
  books: Book[];
}

const Home: React.FunctionComponent<Books> = ({ books }) => {
  const router = useRouter();

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");

  useEffect(() => {
    console.log("bookTitle", bookTitle);
    console.log("bookAuthor", bookAuthor);
    console.log("bookGenre", bookGenre);
  }, [bookTitle, bookAuthor, bookGenre]);

  const displayBooks = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        console.log("Something went wrong");
      } else {
        console.log("Successfully!");
      }
    } catch (error) {
      console.log("There was an error reading", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { bookTitle, bookAuthor, bookGenre };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("Something went wrong");
      } else {
        resetForm()
        router.push(`/`);
        console.log("Submitted successfully!");
      }
    } catch (error) {
      console.log("There was an error submitting", error);
    }
  };

  const resetForm = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
  };

  return (
    <div className="bg-white p-4 flex flex-col items-center">
      <div className="bg-gray-100 p-4 rounded-sm w-96 m-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Book title
            </label>
            <input
              onChange={(e) => setBookTitle(e.target.value)}
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Book title"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label
              htmlFor="author-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Author name
            </label>
            <input
              onChange={(e) => setBookAuthor(e.target.value)}
              type="text"
              id="author-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Author name"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label
              htmlFor="genre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Genre
            </label>
            <input
              onChange={(e) => setBookGenre(e.target.value)}
              type="text"
              id="genre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Genre"
              required
            ></input>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="m-6">
        <ul className="w-96 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {books.map((book) => (
            <li
              key={book.id}
              className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              {book.bookTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/books/");
  const books = await res.json();
  return {
    props: {
      books: books,
    },
  };
};

export default Home;
