const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_db",
});

// Handle database connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes

// Signup Route
app.post("/signup", upload.single("profile_picture"), (req, res) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  const profile_picture = req.file ? req.file.path : null;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error hashing password.");
    }

    const query = "INSERT INTO users (firstname, lastname, phonenumber, email, password, profile_picture) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [firstname, lastname, phonenumber, email, hashedPassword, profile_picture], (err, result) => {
      if (err) {
        return res.status(500).send("Error signing up user.");
      }
      res.status(200).send("Signup successful!");
    });
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT id, firstname, lastname, phonenumber, profile_picture, password FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).send("Error querying database.");
    }

    if (result.length === 0) {
      return res.status(400).send("No user found.");
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).send("Invalid password.");
      }

      res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
        profile_picture: user.profile_picture,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
