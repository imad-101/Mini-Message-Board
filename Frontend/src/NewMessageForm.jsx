import { useState } from "react";
import axios from "axios";

const NewMessageForm = ({ onMessageAdded, isAdd }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/messages", { name, text })
      .then((response) => {
        onMessageAdded(response.data);
        setName("");
        setText("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isAdd && (
        <form className="max-w-sm mx-auto mt-16 " onSubmit={handleSubmit}>
          <label
            htmlFor="website-admin"
            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bonnie Green"
            />
          </div>

          <label
            htmlFor="message"
            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            id="message"
            rows="4"
            className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-6 text-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Add Message
          </button>
        </form>
      )}
    </>
  );
};

export default NewMessageForm;
