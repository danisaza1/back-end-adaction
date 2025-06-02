const express = require('express');
const router = express.Router();
const app = express();

router.get('/donations', (req, res) => {
  res.send('Hello World!')
})
module.exports = router;