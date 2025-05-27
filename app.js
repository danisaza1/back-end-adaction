//npm install pg dotenv
//modification du .env

require('dotenv').config();

const { Pool } = require('pg');
const sql = require('sql');
sql.setDialect('postgres');

const user = sql.define({
  name: 'user',
  columns: ['id', 'name', 'email', 'lastLogin']
});

const query = user
    .select(user.id)
    .from(user)
    .where(
      user.name.equals('boom').and(user.id.equals(1))
    )

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion().catch(err => {
console.error('Erreur lors de la connexion à la base de données:', err);
});

// //Installation de npm install @neondatabase/serverless
// //Rajout d'un .env avec les infos du server
// require("dotenv").config();

// const http = require("http");
// const { neon } = require("@neondatabase/serverless");

// const sql = neon(process.env.DATABASE_URL);

// const requestHandler = async (req, res) => {
//   const result = await sql`SELECT version()`;
//   const { version } = result[0];
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(version);
// };

// http.createServer(requestHandler).listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });