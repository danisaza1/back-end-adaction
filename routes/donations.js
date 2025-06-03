const express = require('express');
const router = express.Router();
const pool = require("../database");

// const database = [];
// router.get("/donations", async (req, res) => {
// res.status(200).json({ message: "Collecte enregistrée avec succès." });
//  try {
//     const result = await pool.query("SELECT * FROM donations ORDER BY created_at DESC;");
//     console.log()
//     res.json({ data: result.rows });
//   } catch (error) {
//     console.error("Erreur dans /donations (GET):", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

router.post("/donations", async (req, res) => {
  // res.send('Donation reçue');
 console.log('req.body outside =', req.body);
   const { asso_name, points, volunteerId } = req.body;
   try {
      console.log('req.body =', req.body);
  // const dataD = { asso_name, points, volunteer_id} = req.body;

  // const { date, cityName, wasteTypes } = req.body;
//  const asso_name = "Ocean Cleanup";
//     const points = 100;
//     const volunteer_id = 2;
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




// app.post('/tasks/', (req, res) => {
//    console.log(req.body)
//   // database.push({tasks: req.body.task, completition: 'fait'})
//   res.send()
  
// })