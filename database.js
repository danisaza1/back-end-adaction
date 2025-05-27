require('dotenv').config();

const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
     rejectUnauthorized: true, 
  },
});

module.exports = pool;




    // require: true,
// const pool = new Pool({

//     connectionString: process.env.DATABASE_URL, ssl : {
//         rejectUnauthorized: true,  
//     }
// });

//la suite est pour tester la connexion
// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query('SELECT version()');
//     console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

