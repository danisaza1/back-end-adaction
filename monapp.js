const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors())

// ✅ Middleware CORS - autorise toutes les origines (à restreindre en prod !)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Raw body:', req.body);
  next();
});

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