const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/messages", async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM messages')  
    res.json(response.rows);
  } catch (error) {
    console.error(error.message); 
  }
});

app.post("/api/messages", async (req, res) => {
  const { text, name } = req.body;
  try {
    const response = await pool.query('INSERT INTO messages (name , message) VALUES ($1, $2) RETURNING *', [name, text]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
