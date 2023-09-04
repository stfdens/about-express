const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({
            message: 'tidak ada token, akses ditolak'
        })
    } 

    jwt.verify(token.split(' ')[0], 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(200).json({ message: 'token tidak valid'})
        }

        req.user = decoded
        next();
    })
}

module.exports = authenticateJwt;
