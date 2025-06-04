const express = require('express');
const router = express.Router();
const pool = require('./database');


router.get('/profil', async (req, res) => {
    try {
const volTable = "SELECT * FROM volunteers";
const result = await pool.query(volTable); 
res.json(result.rows)
console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /profil:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
});
module.exports = router;

// router.get('/updateProfil', async (req, res) => {
//       console.log("📩 Données reçues :", req.body); //
//   try {
//     const { firstname, lastname, location } = req.body;
    
//      // 1. Récupérer l'id de la ville à partir de son nom
//     const vol = await pool.query(
//       'SELECT id FROM volunteers WHERE firstname = Mohamed',
//       [firstname]    
//     );

//     if (vol.rows.length === 0) {
//       return res.status(400).json({ error: 'Ville non trouvée' });
//     }

//     // const vol_id = vol.rows[0].id;

//     // Exemple : insérer dans la base de données
//     for (const item of volunteers) {
//       await pool.query(
//         'INSERT INTO volunteers (firstname, lastname, location) VALUES ($1, $2, $3)',
//         [item.firstname, item.lastname, item.location]
//       );
//     }

//     res.status(200).json({ message: 'Collecte enregistrée avec succès.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
//   }
// });


// module.exports = router;