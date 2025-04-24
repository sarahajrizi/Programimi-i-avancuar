const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/notes", async (req, res) => {
  const { title } = req.body;
  try {
    await db.query("INSERT INTO notes (title) VALUES (?)", [title]);
    res.status(201).json({ message: "Note created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM notes WHERE id = ?", [id]);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
