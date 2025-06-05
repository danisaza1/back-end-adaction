const express = require('express');

const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors())

app.use(express.json())
// ✅ Middleware CORS - autorise toutes les origines (à restreindre en prod !)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const profilRoutes = require('./routes/formulaire');
// ici /profil appelle le fichier profil.js
app.use('/', profilRoutes);

const cityRoutes = require('./cities');
app.use('/', cityRoutes);
// ✅ Routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/', dashboardRoutes);

const collectesRoutes = require('./routes/collectes');
app.use('/', collectesRoutes);

const formulaireRoutes = require('./routes/formulaire')
app.use('/', formulaireRoutes);

// ✅ Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});