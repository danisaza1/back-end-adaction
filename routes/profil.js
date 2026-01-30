const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/profil", async (req, res) => {
  try {
    const query =
      "SELECT id, firstname, lastname, email, password, location, created_at, updated_at FROM volunteers ORDER BY created_at DESC"; // Get all relevant fields
    const result = await pool.query(query);
    res.json(result.rows);
    console.log("Fetched all volunteers:", result.rows.length, "items");
  } catch (error) {
    console.error("Erreur dans GET /profil (tous les bénévoles):", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des bénévoles." });
  }
});

router.get("/profil/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "SELECT id, firstname, lastname, location FROM volunteers WHERE id=$1"; // Added ID to select
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bénévole non trouvé." });
    }
    res.json(result.rows[0]); // Return single object, not array
    console.log(result.rows[0]);
  } catch (error) {
    console.error("Erreur dans GET /profil/:id:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/profil", async (req, res) => {
  const { firstName, lastName, email, password, location } = req.body;

  // Basic validation (you should add more robust validation)
  if (!firstName || !lastName || !email || !password || !location) {
    return res
      .status(400)
      .json({ error: "Tous les champs requis ne sont pas fournis." });
  }

  try {
    // Note: It's highly recommended to hash passwords before storing them!
    const query = `
      INSERT INTO volunteers (firstname, lastname, email, password, location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstname, lastname, location, created_at, updated_at;
    `;
    const values = [firstName, lastName, email, password, location];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Bénévole ajouté avec succès.",
      volunteer: result.rows[0],
    }); // 201 Created
    console.log("Nouveau bénévole ajouté:", result.rows[0]);
  } catch (error) {
    console.error("Erreur dans POST /profil (ajout de bénévole):", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de l'ajout du bénévole." });
  }
});

router.patch("/updateProfil/:id", async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  console.log("📩 Données reçues :", fields);

  // Si aucune donnée à mettre à jour
  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: "Aucun champ à mettre à jour." });
  }

  try {
    // Construction dynamique des champs
    const setClauses = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(fields)) {
      setClauses.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    values.push(id); // L'id est la dernière valeur

    const query = `
            UPDATE volunteers
            SET ${setClauses.join(", ")}
            WHERE id = $${index}
            RETURNING *;
            `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Profil non trouvé." });
    }

    return res.status(200).json({
      message: "Profil mis à jour avec succès.",
      profil: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Erreur SQL :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

router.delete("/profil/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM volunteers WHERE id = $1 RETURNING id;";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bénévole non trouvé." });
    }

    res
      .status(200)
      .json({
        message: "Bénévole supprimé avec succès.",
        deletedId: result.rows[0].id,
      });
    console.log(`Bénévole avec l'ID ${id} supprimé.`);
  } catch (error) {
    console.error("Erreur lors de la suppression du bénévole:", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});

module.exports = router;
