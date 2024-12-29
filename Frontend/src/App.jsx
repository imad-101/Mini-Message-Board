import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import NewMessageForm from "./NewMessageForm";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

const App = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages when the component mounts
    axios
      .get("http://localhost:5000/api/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle new message addition
  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setIsAdd(false); // Hide the form after a new message is added
  };

  return (
    <div className="dark:bg-gray-900 pb-9">
      <Navbar isAdd={isAdd} setIsAdd={setIsAdd} />
      <div className="flex">
        {/* NewMessageForm takes up space on the side when isAdd is true */}
        {isAdd && (
          <div className="w-full md:w-1/3 p-4">
            <NewMessageForm onMessageAdded={handleNewMessage} isAdd={isAdd} />
          </div>
        )}
        {/* MessageList takes full width or side when form is visible */}
        <div
          className={`w-full ${
            isAdd ? "md:w-2/3" : "w-full"
          } transition-all duration-300 ease-in-out`}
        >
          <MessageList messages={messages} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
