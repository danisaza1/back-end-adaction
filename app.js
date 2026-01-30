import { PrismaClient } from "@prisma/client";

import express from "express";
import cors from "cors";
import session from "express-session";
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
  }),
);

import profilRoutes from "./routes/profil.js";
app.use("/", profilRoutes);

import cityRoutes from "./routes/cities.js";
app.use("/", cityRoutes);

import dashboardRoutes from "./routes/dashboard.js";
app.use("/", dashboardRoutes);

import collectesRoutes from "./routes/collectes.js";
app.use("/", collectesRoutes);

import formulaireRoutes from "./routes/formulaire.js";
app.use("/", formulaireRoutes);

import donationsRoutes from "./routes/donations.js";
app.use("/", donationsRoutes);

import authRoutes from "./routes/auth.js";
app.use("/", authRoutes);

// ✅ Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Backend démarré sur http://localhost:${port}`);
});
