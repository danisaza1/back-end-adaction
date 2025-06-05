const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/profil', async (req, res) => {
    try {
const volTable = "SELECT firstname, lastname, location FROM volunteers WHERE id=2";
const result = await pool.query(volTable); 
res.json(result.rows)
console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /profil:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});
module.exports = router;

