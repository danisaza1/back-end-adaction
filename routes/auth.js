const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "monsecret123"; // même secret
const pool = require("../database");

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  // Cherche l'utilisateur dans ta DB avec email et password (hashé de préférence)
  const result = await pool.query(
    "SELECT * FROM volunteers WHERE email = $1 AND password = $2",
    [email, password]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }

  const user = result.rows[0];
  req.session.userId = user.id;

  // Génère le token avec id et email
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  res.json({ token, id: user.id, firstname: user.firstname });
});

module.exports = router;
