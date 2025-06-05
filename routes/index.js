require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3007

// Connexion à la base Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Exemple : récupérer tous les éléments d'une table "users"
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT version()');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur de requête :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
  console.log('bouh')
});
