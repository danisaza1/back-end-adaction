const jwt = require('jsonwebtoken');
const secret = 'monsecret123'; // à remplacer par une vraie variable d'env

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

    // Priorité à la session si elle existe
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    return next();
  }
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, secret);
    req.user = decode; //{ id: 1, email: '...' }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
} 

module.exports = authMiddleware;