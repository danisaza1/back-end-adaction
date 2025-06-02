const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// const routes = require('./routes')
// app.use('/', routes) 
const dashboardRoutes = require('./dashboard');
app.use('/', dashboardRoutes)

// const dashboardRoutes = require('./dashboard');
// app.use('/api', dashboardRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
