const express = require('express');
const router = express.Router();
const pool = require('./database');

router.get('/cities', async (req, res) => {
    try {
const volTable = 'SELECT city_name FROM cities;';
const result = await pool.query(volTable); 
res.json(result.rows)
console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /cities:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});

module.exports = router;