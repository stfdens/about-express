const jwt = require('jsonwebtoken');
const authService = require('../service/AuthService');

class AuthController {
  static async login(req, res) {
    try {
      const date = 86400;
      const data = await authService.login(req.body);

      if (data) {
        const token = jwt.sign({ _id: data.id, role: data.role }, 'BEBAS_ANJING', { expiresIn: date });
        res.status(200).json({
          message: 'berhasil login',
          refreshToken: token,
        });
      } else {
        res.status(400).json({
          message: 'data tidak ditemukan',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'maaf terjadi kesalahan pada server kami',
      });
    }
  }
}

module.exports = AuthController;
