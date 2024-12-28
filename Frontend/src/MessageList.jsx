const MessageList = ({ messages }) => {
  return (
    <div className=" p-4 px-16">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center py-6 pb-10">
        Messages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-blue-100 dark:bg-blue-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {msg.name}
            </h3>
            <p className="text-gray-700 mb-4">{msg.text}</p>
            <p className="text-sm text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
