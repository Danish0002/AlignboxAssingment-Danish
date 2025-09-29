import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Create messages table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50),
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Get messages
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages ORDER BY created_at ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Post message
app.post("/messages", (req, res) => {
  const { user, text } = req.body;
  db.query("INSERT INTO messages (user, text) VALUES (?, ?)", [user, text], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, user, text });
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
