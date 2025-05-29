// require('dotenv').config();

// const { Pool } = require('pg');

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   user: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: {
//     require: true,
//   },
// });

// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query('SELECT * FROM volunteers');
//     console.log(result.rows[3]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion().catch(err => {
// console.error('Erreur lors de la connexion à la base de données:', err);
// });

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send(getPgVersion())
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// const routes = require('./routes')
// app.use('/', routes) 
const profilRoutes = require('./profil');
app.use('/', profilRoutes)

// const dashboardRoutes = require('./dashboard');
// app.use('/api', dashboardRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});