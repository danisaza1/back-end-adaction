const express = require('express');
const router = express.Router();
const pool = require('./database');
// index.js
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.send('CORS is enabled for all origins!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


router.get('/profil', async (req, res) => {
    try {
const volTable = 'SELECT * FROM volunteers;';
const result = await pool.query(volTable); 
res.json(result.rows)
console.log(result.rows);
    } catch (error) {
        console.error('Erreur dans /profil:', error);
        res.stat
console.log("")

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
   
try {
  console.log("📩 Données reçues :", req.body); 
  //const { firstname, lastname } = req.body;
  
   // 1. Récupérer l'id de la ville à partir de son nom

 
 

  //const city_id = cityResult.rows[0].id;

  // Exemple : insérer dans la base de données
  //for (const item of wasteTypes) {
    //await pool.query(
      //'INSERT INTO volunteer (firstname, lastname, ) VALUES ($1, $2)',
      //[firstname, lastname]
    //);
  //}

  r//es.status(200).json({ message: 'Collecte enregistrée avec succès.' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: `Erreur lors de l'enregistrement.` });
}
});
module.exports = router;


    



  
  
    
    

