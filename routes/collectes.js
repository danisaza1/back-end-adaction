<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/waste-types", async (req, res) => {
  try {
    const sql = "SELECT type, quantity FROM waste_type;";
=======
const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/waste-types', async (req, res) => {
  try {
    const sql = 'SELECT type, quantity FROM waste_type;';
>>>>>>> gestion-des-benevoles
    const result = await pool.query(sql);
    res.json({ wasteTypes: result.rows });
  } catch (error) {
    console.error(error);
<<<<<<< HEAD
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des types de déchets." });
=======
    res.status(500).json({ error: 'Erreur lors de la récupération des types de déchets.' });
>>>>>>> gestion-des-benevoles
  }
});

// Route pour récupérer les villes
<<<<<<< HEAD
router.get("/cities", async (req, res) => {
  try {
    const sql = "SELECT id, city_name FROM cities;";
=======
router.get('/cities', async (req, res) => {
  try {
    const sql = 'SELECT id, city_name FROM cities;';
>>>>>>> gestion-des-benevoles
    const result = await pool.query(sql);
    res.json({ cities: result.rows });
  } catch (error) {
    console.error(error);
<<<<<<< HEAD
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des villes." });
=======
    res.status(500).json({ error: 'Erreur lors de la récupération des villes.' });
>>>>>>> gestion-des-benevoles
  }
});


<<<<<<< HEAD
=======


>>>>>>> gestion-des-benevoles
router.post('/collectes', async (req, res) => {
      console.log("📩 Données reçues :", req.body); //
  try {
    const { date, cityName, wasteTypes } = req.body;
<<<<<<< HEAD
     console.log("📩 Données reçues :", req.body); //

    // 1. Récupérer l'id de la ville à partir de son nom
    const cityResult = await pool.query(
      "SELECT id FROM cities WHERE city_name = $1",

=======
    
     // 1. Récupérer l'id de la ville à partir de son nom
    const cityResult = await pool.query(
      'SELECT id FROM cities WHERE city_name = $1',
>>>>>>> gestion-des-benevoles
      [cityName]
    );

    if (cityResult.rows.length === 0) {
<<<<<<< HEAD
      return res.status(400).json({ error: "Ville non trouvée" });
=======
      return res.status(400).json({ error: 'Ville non trouvée' });
>>>>>>> gestion-des-benevoles
    }

    const city_id = cityResult.rows[0].id;

    // Exemple : insérer dans la base de données
    for (const item of wasteTypes) {
      await pool.query(
<<<<<<< HEAD
        "INSERT INTO collects (date, city_id, type, quantity) VALUES ($1, $2, $3, $4)",
=======
        'INSERT INTO collects (date, city_id, type, quantity) VALUES ($1, $2, $3, $4)',
>>>>>>> gestion-des-benevoles
        [date, city_id, item.label, item.quantity]
      );
    }

<<<<<<< HEAD
    res.status(200).json({ message: "Collecte enregistrée avec succès." });
=======
    res.status(200).json({ message: 'Collecte enregistrée avec succès.' });
>>>>>>> gestion-des-benevoles
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
  }
});

<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;
>>>>>>> gestion-des-benevoles
