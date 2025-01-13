const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { userpool } = require("./db");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      userpool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        async (err, result) => {
          if (err) {
            console.error(err.message);
            return done(err);
          }
          if (result.rows.length === 0) {
            return done(null, false, { message: "Incorrect username" });
          }
          const user = result.rows[0];
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userpool.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.error(err.message);
      return done(err);
    }
    const user = result.rows[0];
    done(null, user);
  });
});

app.use("/",(req, res) =>{
  res.send('hello)
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
