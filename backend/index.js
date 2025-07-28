const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-service",
  user: "root",
  password: "password",
  database: "cruddb",
});

db.connect(err => {
  if (err) console.error("DB connection failed:", err);
  else console.log("MySQL connected");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
    if (err) return res.status(500).send(err);
    res.send("User added");
  });
});

app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("User deleted");
  });
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
