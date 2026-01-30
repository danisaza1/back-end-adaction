import { PrismaClient } from '@prisma/client';

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(cors());
// ✅ Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});
app.use(
  session({
    secret: "ton_secret_de_session", // une clé secrète pour sécuriser la session
    resave: false, // évite de sauvegarder la session si rien n’a changé
    saveUninitialized: true, // sauvegarde même les sessions non modifiées
    cookie: { secure: false }, // à mettre à true uniquement si HTTPS
  })
);

const profilRoutes = require("./routes/profil");
app.use("/", profilRoutes);

const cityRoutes = require("./routes/cities");
app.use("/", cityRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/", dashboardRoutes);

const collectesRoutes = require("./routes/collectes");
app.use("/", collectesRoutes);

const formulaireRoutes = require("./routes/formulaire");
app.use("/", formulaireRoutes);

const donationsRoutes = require("./routes/donations");
app.use("/", donationsRoutes);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// ✅ Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${port}`);
});
