const express = require("express");
const { messagepool } = require("../db");
const router = express.Router();

router.get("/msgapi/messages", async (req, res) => {
  try {
    const response = await messagepool.query("SELECT * FROM messages");
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving messages");
  }
});

router.post("/msgapi/messages", async (req, res) => {
  const { text, name } = req.body;
  try {
    const response = await messagepool.query(
      "INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING *",
      [name, text]
    );
    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error saving message");
  }
});

module.exports = router;
