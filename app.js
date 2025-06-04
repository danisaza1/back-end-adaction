<<<<<<< HEAD
const cors = require("cors");
const express = require("express");

=======
const express = require('express');
const cors = require('cors');
>>>>>>> dashboard
const app = express();
const port = 3001;
app.use(cors());

// ✅ Middleware CORS - autorise toutes les origines (à restreindre en prod !)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Raw body:', req.body);
  next();
});
// ✅ Routes
const dashboardRoutes = require("./routes/dashboard");
app.use("/", dashboardRoutes);

const collectesRoutes = require("./routes/collectes");
app.use("/", collectesRoutes);

const donationsRoutes = require('./routes/donations');
app.use('/', donationsRoutes);

const profilRoutes = require('./routes/profil');
app.use('/', profilRoutes);

// ✅ Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${port}`);
});