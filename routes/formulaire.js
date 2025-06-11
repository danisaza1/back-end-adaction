const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/profil', async (req, res) => {
    try {
const volTable = 'SELECT * FROM volunteers ORDER BY id DESC LIMIT 10;';
const result = await pool.query(volTable); 
res.json(result.rows)
console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /profil:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});

router.get('/name', async (req, res) => {
    try {
        const volTable = 'SELECT firstname,lastname FROM volunteers;';
        const result = await pool.query(volTable); 
        res.json(result.rows)
        console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /name:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});

router.post('/formulaire', async (req, res) => {
  console.log("📩 Données reçues :", req.body);

  try {
    const { lastname, firstname,location,email,password} = req.body; 

    await pool.query(
      'INSERT INTO volunteers (lastname, firstname, location, email, password) VALUES ($1, $2, $3, $4, $5)', 
      [lastname, firstname,location,email,password]
    );

    res.status(200).json({ message: 'Collecte enregistrée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans la base de données :', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;