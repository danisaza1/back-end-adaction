

const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/waste-types", async (req, res) => {
  try {
    const sql = "SELECT type, quantity FROM waste_type;";
    const result = await pool.query(sql);
    res.json({ wasteTypes: result.rows });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Erreur lors de la récupération des types de déchets.' });
  }
});

// Route pour récupérer les villes

router.get('/cities', async (req, res) => {
  try {
    const sql = 'SELECT id, city_name FROM cities;';
    const result = await pool.query(sql);
    res.json({ cities: result.rows });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Erreur lors de la récupération des villes.' });
  }
});


router.post('/collectes', async (req, res) => {
  try {
    const { date, cityName, wasteTypes, volunteerId  } = req.body;
     console.log("📩 Données reçues :", req.body); //

    // 1. Récupérer l'id de la ville à partir de son nom
    const cityResult = await pool.query(
      "SELECT id FROM cities WHERE city_name = $1",


      [cityName]
    );

    if (cityResult.rows.length === 0) {
      return res.status(400).json({ error: "Ville non trouvée" });

    }

    const city_id = cityResult.rows[0].id;



    const insertCollectQuery = `
            INSERT INTO collects (date, city, volunteer_id, city_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id; -- Get the ID of the newly inserted collection
        `;
        const collectResult = await pool.query(insertCollectQuery, [
            date,
            cityName,  //mais ici on garde le nom et pas l'id
            volunteerId, 
            city_id    //pour faire lien avec cities  
        ]);
const collecte_id = collectResult.rows[0].id; // This is the ID we'll use for waste_type
 for (const item of wasteTypes) {
            // Ensure item.label matches waste_enum types if applicable, or is just TEXT
            const insertWasteTypeQuery = `
                INSERT INTO waste_type (collecte_id, type, quantity)
                VALUES ($1, $2, $3);
            `;
            await pool.query(insertWasteTypeQuery, [
                collecte_id, // Link to the 'collects' record
                item.label,  // This is the 'type' in your waste_type table
                item.quantity
            ]);
          }
    res.status(200).json({ message: "Collecte enregistrée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
  }
});

module.exports = router;
