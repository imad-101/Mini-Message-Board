import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import NewMessageForm from "./NewMessageForm";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import Account from "./Account";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    const storedLoginTime = localStorage.getItem("loginTime");
    const currentTime = new Date().getTime();

    if (storedLoginState === "true" && storedLoginTime) {
      const timeDiff = currentTime - storedLoginTime;

      if (timeDiff > 12 * 60 * 60 * 1000) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("loginTime");
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }
  }, [setIsLogin]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/msgapi/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setIsAdd(false);
  };

  return (
    <div className="dark:bg-gray-900 pb-9">
      <>
        <Navbar
          isLogin={isLogin}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setIsLogin={setIsLogin}
        />
        <div className="flex">
          {isAdd && (
            <div className="w-full md:w-1/3 p-4">
              <NewMessageForm onMessageAdded={handleNewMessage} isAdd={isAdd} />
            </div>
          )}
          <div
            className={`w-full ${
              isAdd ? "md:w-2/3" : "w-full"
            } transition-all duration-300 ease-in-out`}
          >
            <MessageList messages={messages} />
          </div>
        </div>
        <Footer />
        {showLogin && (
          <Account
            setShowLogin={setShowLogin}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        )}
      </>
    </div>
  );
};

export default App;
