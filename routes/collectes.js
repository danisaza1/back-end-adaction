const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/waste-types', async (req, res) => {
  try {
    const sql = 'SELECT type, quantity FROM waste_type;';
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
      console.log("📩 Données reçues :", req.body); //
  try {
    const { date, cityName, wasteTypes } = req.body;
    
     // 1. Récupérer l'id de la ville à partir de son nom
    const cityResult = await pool.query(
      'SELECT id FROM cities WHERE city_name = $1',
      [cityName]
    );

    if (cityResult.rows.length === 0) {
      return res.status(400).json({ error: 'Ville non trouvée' });
    }

    const city_id = cityResult.rows[0].id;

    // Exemple : insérer dans la base de données
    for (const item of wasteTypes) {
      await pool.query(
        'INSERT INTO collects (date, city_id, type, quantity) VALUES ($1, $2, $3, $4)',
        [date, city_id, item.label, item.quantity]
      );
    }

    res.status(200).json({ message: 'Collecte enregistrée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
  }
});


module.exports = router;