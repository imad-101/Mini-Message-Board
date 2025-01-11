import { useState, useEffect } from "react";
import axios from "axios";

function Account({ setShowLogin, isLogin, setIsLogin }) {
  const [loginPage, setLoginPage] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setShowLogin((prevState) => !prevState);
  };

  const handleSwitch = () => {
    setLoginPage(!loginPage);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/userapi/register", { username, password })
      .then((response) => {
        alert("Registered Successfully");
        handleSwitch();
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        alert("Failed to register");
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in user with:", { username, password });

    axios
      .post("http://localhost:5000/userapi/login", { username, password })
      .then((response) => {
        console.log("Response:", response.data);
        // Store login state in localStorage and update state
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("loginTime");
        alert("Login Successful");
        setIsLogin(true); // Set user as logged in
        setShowLogin(false); // Close login/register modal
      })
      .catch((error) => {
        console.error("Login Error:", error);
        alert("Failed to login");
      });
  };

  return loginPage ? (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] bg-blue-200 before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 relative">
        <button
          onClick={handleLogin}
          className="cursor-pointer absolute right-10"
        >
          {/* Close button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-gray-600 dark:fill-gray-300 float-right"
            viewBox="0 0 320.591 320.591"
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
          </svg>
        </button>

        <div className="my-8 text-center">
          <h4 className="text-3xl text-gray-800 dark:text-white font-extrabold">
            Register
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Create an account with us
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative flex items-center">
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Email"
              className="px-4 py-3 bg-white text-gray-800 dark:bg-gray-700 dark:text-white w-full text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="relative flex items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="px-4 py-3 bg-white text-gray-800 dark:bg-gray-700 dark:text-white w-full text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="!mt-8 space-y-4">
            <button
              type="submit"
              className="px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg tracking-wide"
            >
              Create an account
            </button>
          </div>
        </form>

        <hr className="my-8 border-gray-300 dark:border-gray-600" />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            className="text-blue-800 dark:text-blue-400"
            onClick={handleSwitch}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 relative">
        <button
          onClick={handleLogin}
          className="cursor-pointer absolute right-10"
        >
          {/* Close button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-gray-600 dark:fill-gray-300 float-right"
            viewBox="0 0 320.591 320.591"
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
          </svg>
        </button>

        <div className="my-8 text-center">
          <h4 className="text-3xl text-gray-800 dark:text-white font-extrabold">
            Login
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Login to your existing account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div className="relative flex items-center">
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Email"
              className="px-4 py-3 bg-white text-gray-800 dark:bg-gray-700 dark:text-white w-full text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="relative flex items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="px-4 py-3 bg-white text-gray-800 dark:bg-gray-700 dark:text-white w-full text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="!mt-8 space-y-4">
            <button
              type="submit"
              className="px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg tracking-wide"
            >
              Login
            </button>
          </div>
        </form>

        <hr className="my-8 border-gray-300 dark:border-gray-600" />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            className="text-blue-800 dark:text-blue-400"
            onClick={handleSwitch}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Account;
