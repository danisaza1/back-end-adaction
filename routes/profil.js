const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/profil", async (req, res) => {
  try {
    const volTable =
      "SELECT firstname, lastname, location FROM volunteers WHERE id=2";
    const result = await pool.query(volTable);
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.error("Erreur dans /profil:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
module.exports = router;

router.post("/updateProfil", async (req, res) => {
  console.log("📩 Données reçues :", req.body);
  try {
    const { firstname, lastname, location } = req.body;

    const vol = await pool.query(
      `UPDATE volunteers 
  SET firstname = $1, lastname = $2, location = $3 
  WHERE firstname = $4`,
      [firstname, lastname, location, "Mohamed"]
    );

    res.status(200).json({ message: "Collecte enregistrée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
  }
});

module.exports = router;