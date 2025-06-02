const express = require('express');
const cors = require('cors');

const app = express();
const cors = require('cors');
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

// ✅ Routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/', dashboardRoutes);

const collectesRoutes = require('./routes/collectes');
app.use('/', collectesRoutes);

// ✅ Démarrage du serveur
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`🚀 Backend démarré sur http://localhost:${port}`);
=======
  console.log(`Example app listening on port ${port}`)
>>>>>>> effeef1a8aa7189574309df21717d0e91c20d61f
});
