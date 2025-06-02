const express = require('express');
const app = express();
const port = 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const profilRoutes = require('./profil');
// ici /profil appelle le fichier profil.js
app.use('/', profilRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
});

console.log('app.js')


const cityRoutes = require('./cities');
app.use('/', cityRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
});


















//ajouter un élément depuis next

// app.post('/ajouter', async (req, res) => {
//   const { element } = req.body;
//   try {
//     await pool.query('INSERT INTO volunteers (lastname) VALUES ($1)', [element]);
//     res.status(200).send('Élément ajouté');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Erreur serveur');
//   }
// });

// app.listen(port, () => {
//   console.log(`Serveur Node en écoute sur http://localhost:${port}`);
// });
