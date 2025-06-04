// exports.index = function(req, res){
//     //changer render
//   res.render('index', { title: 'Route Separation Example' });
// };
const express = require("express");
const router = express.Router();
const pool = require("../database");
// const waste_types = require('./waste_types.json')

router.get("/dashboard", async (req, res) => {
  //  de recuperat din profil dupa aia
  const userId = 4;
  try {
    const joinTable =
      "SELECT volunteers.id, volunteers.firstname, collects.date, waste_type.id, waste_type.type, waste_type.quantity FROM volunteers LEFT JOIN collects ON volunteers.id = collects.volunteer_id LEFT JOIN waste_type ON collects.id = waste_type.collecte_id WHERE volunteers.id = $1 ;";
    const result = await pool.query(joinTable, [userId]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.error("Erreur dans /dashboard:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
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
