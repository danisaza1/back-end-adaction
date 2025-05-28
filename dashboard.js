
// exports.index = function(req, res){
//     //changer render
//   res.render('index', { title: 'Route Separation Example' });
// };
const express = require('express');
const router = express.Router();
const pool = require('./database');
// const waste_types = require('./waste_types.json')


router.get('/dashboard', async (req, res) => {
    try {
const volTable = 'SELECT type, quantity FROM waste_type;';
const result = await pool.query(volTable); 
 res.json(result.rows)
 console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /dashboard:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});
module.exports = router;


// router.post('/waste_type', async (req, res) => {
//   try {
//     const { collecte_id, type, quantity } = req.body;
//   }

//   const values = [collecte_id, type, quantity];
// const result = await pool.query(sql, values);


// app.get('/waste_types', (req, res) => {
//   res.json(waste_types);
// });
