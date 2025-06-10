const express = require('express');
const router = express.Router();
const pool = require("../database");

router.post("/donations", async (req, res) => {
  // res.send('Donation reçue');
  console.log('req.body outside =', req.body);
  const { asso_name, points, volunteerId } = req.body;
  try {
    console.log('req.body =', req.body);
    
    const query = `INSERT INTO donations (asso_name, points, volunteer_id) VALUES ($1, $2, $3)`;
    const result = await pool.query(query, [asso_name, points, volunteerId]);
    res.json({ message: 'Donation reçue', result });
  }
  catch (error) {
    console.error("Erreur dans /donations:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
})


module.exports = router;


