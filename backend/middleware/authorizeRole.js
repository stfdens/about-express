// const authorize = (allowerdRoles) => (req, res, next) => {
//   const userRole = req.account.role;

//   if (allowerdRoles.includes(userRole)) {
//     next();
//   }
//   res.status(403).json({
//     message: 'anda tidak dapat mengakses ini',
//   });
// };

class authorize {
  static async admin(req, res, next) {
    try {
      const userRole = req.account.role;
      console.log('User Role:', userRole);
      if (userRole === 'admin') { // Harus sesuai dengan "admin" yang ada dalam token
        next();
      }
      res.status(403).json({
        message: 'anda tidak berhak',
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async guru(req, res, next) {
    try {
      const userRole = req.account.role;

      if (userRole === 'guru') {
        next();
      }

      res.status(403).json({
        message: 'anda tidak berhask',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }
}

module.exports = authorize;
