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

// router.get("/donations/:id", async (req, res) => {
// const volunteerId = req.params.id; 
//   const result = await pool.query(
//     "SELECT SUM(points) AS total_points FROM donations WHERE volunteer_id = $1",
//     [volunteerId]
//   )
//   res.json({ totalPoints: result.rows[0].total_points || 0 });
// });
module.exports = router;




// app.post('/tasks/', (req, res) => {
//    console.log(req.body)
//   // database.push({tasks: req.body.task, completition: 'fait'})
//   res.send()
  
// })