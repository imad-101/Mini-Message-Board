import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";

function Navbar({
  isAdd,
  setIsAdd,
  showLogin,
  setShowLogin,
  isLogin,
  setIsLogin,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeAdd = () => {
    setIsAdd(!isAdd);
  };
  const handleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/userapi/logout")
      .then((response) => {
        alert("Logout Successfull");
        window.location.reload();
        setIsLogin(false);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        alert("Failed to logout");
      });
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Close the menu if the screen width is larger than or equal to 768px
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 pt-5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logo.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Mini Message Board
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={isLogin ? changeAdd : () => alert("Login to add")}
                className="mt-3 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover:text-black"
              >
                Add New Message
              </button>
            </li>
            <li>
              <button>
                <a
                  onClick={handleLogin}
                  target="blank"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mt-3"
                >
                  Login / Register
                </a>
              </button>
            </li>

            {isLogin && (
              <li>
                <button>
                  <a
                    onClick={handleLogout}
                    target="blank"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mt-3"
                  >
                    Logout
                  </a>
                </button>
              </li>
            )}
            <span className="mb-3">
              <DarkModeToggle />
            </span>
          </ul>
        </div>
      </div>
      {/* Mini menu for small screens */}
      <div
        className={`fixed top-0 left-0 px-6 h-full z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
      >
        <button
          className="absolute top-5 right-5 text-gray-900 dark:text-gray-300"
          onClick={toggleMenu}
        >
          <span>&#x2715;</span>
        </button>
        <ul className="mt-10 space-y-4 p-5">
          <li>
            <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
              Add New Message
            </button>
          </li>
          <li>
            <button>
              <a
                onClick={handleLogin}
                target="blank"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mt-3"
              >
                Login / Register
              </a>
            </button>
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
