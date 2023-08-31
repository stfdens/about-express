const authService = require('../service/AuthService');
const jwt = require('jsonwebtoken')

class AuthController {
  static async login(req, res) {
    try {
      const data = await authService.login(req.body);

      const token = jwt.sign({ _id: data.id }, 'secret_key')
      res.status(200).json({
        refreshToken: token,
      })

      if (data) {
        res.status(200).json({
          message: 'berhasil login',
          token: token,
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
        })
    }
  }
}

module.exports = AuthController;
