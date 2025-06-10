const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/profil/:id", async (req, res) => {
    const { id } = req.params;
  try {
    const query =
      "SELECT firstname, lastname, location FROM volunteers WHERE id=$1";
    const result = await pool.query(query, [id]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.error("Erreur dans /profil:", error);
    res.status(500).json({ error: "Erreur serveur" });
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
            SET ${setClauses.join(', ')}
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

        
        module.exports = router;



