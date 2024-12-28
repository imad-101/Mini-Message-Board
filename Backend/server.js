const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sample data
let messages = [
  {
    id: 1,
    name: "Imad",
    text: "Hello, world! This is a test message.",
    timestamp: new Date(),
  },
  {
    id: 2,
    name: "John Doe",
    text: "Random thoughts on programming.",
    timestamp: new Date(),
  },
  {
    id: 3,
    name: "Allen",
    text: "Just finished a new project. Excited to share!",
    timestamp: new Date(),
  },
  {
    id: 4,
    name: "Joe Harmozi",
    text: "Learning React is fun, but challenging.",
    timestamp: new Date(),
  },
  {
    id: 5,
    name: "Emily Clark",
    text: "I wonder how AI will change the world in the next decade.",
    timestamp: new Date(),
  },
  {
    id: 6,
    name: "Sophia Martinez",
    text: "Just completed a 5k run! Feeling great.",
    timestamp: new Date(),
  },
  {
    id: 7,
    name: "Lucas Gray",
    text: "Thinking about starting a new coding project. Any ideas?",
    timestamp: new Date(),
  },
  {
    id: 8,
    name: "Olivia Brooks",
    text: "The weather today is amazing. Perfect for a walk.",
    timestamp: new Date(),
  },
];

// Routes
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { name, text } = req.body;
  const newMessage = {
    id: messages.length + 1,
    name,
    text,
    timestamp: new Date(),
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
