const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'tidak ada token, akses ditolak',
    });
  }

  jwt.verify(token.split(' ')[1], 'BEBAS_ANJING', (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'token tidak valid' });
    }

    req.account = decoded;
    next();
  });
};

module.exports = authenticateJwt;
