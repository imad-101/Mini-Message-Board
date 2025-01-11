const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { userpool } = require("../db");
const router = express.Router();

router.post("/userapi/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await userpool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).send("Registered Successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error registering user");
  }
});
router.post(
  "/userapi/login",
  passport.authenticate("local", { failureRedirect: "./login" }),
  (req, res) => {
    res.send("Successfull login");
  }
);
router.post("/userapi/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out user");
    } else {
      console.log("User logged out successfully");
    }
  });
  res.send("User logged out successfully");
});

module.exports = router;
