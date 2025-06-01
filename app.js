const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const profilRoutes = require('./profil');
app.use('/', profilRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});