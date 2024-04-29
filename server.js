const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vuetest",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL bağlantısı başarıyla kuruldu");
});

app.get("/users", (req, res) => {
  const sql = "SELECT id, username, email FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Kullanıcı silinirken bir hata oluştu:", err);
      res.status(500).json({ error: "Kullanıcı silinirken bir hata oluştu" });
      return;
    }
    console.log(`ID ${userId} ile kullanıcı başarıyla silindi.`);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
