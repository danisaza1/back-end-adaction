
// exports.index = function(req, res){
//     //changer render
//   res.render('index', { title: 'Route Separation Example' });
// };
const express = require('express');
const app = express();
const port = 3001;
const waste_types = require('./waste_types.json')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/waste_types', (req, res) => {
  res.json(waste_types);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});




// CREATE TABLE waste_type {
// id BIGSERIAL,
// date DATE NOT NULL, 
// city TEXT NOT NULL, 
// Cigarette_butts INTEGER DEFAULT 0,
// plastic INTEGER DEFAULT 0,
// glass INTEGER DEFAULT 0,
// metal INTEGER DEFAULT 0,
// electronic INTEGER DEFAULT 0,
// others INTEGER DEFAULT 0,
// created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
// }