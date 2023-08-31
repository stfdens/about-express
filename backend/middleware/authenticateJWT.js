const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, nex) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.stataus(401).json({
            message: 'tidak ada token, akses ditolak'
        })
    } 
}