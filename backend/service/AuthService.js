const { Pool } = require('pg');
const bcrypt = require('bcrypt');

class AuthService {
  constructor() {
    this._pool = new Pool();
  }

  async login({ username, password }) {
    try {
      const query = {
        text: 'SELECT * FROM account WHERE username = $1',
        values: [username],
      };

      const result = await this._pool.query(query);

      if (result.rows.length > 0) {
        const AmbilHashDariDb = result.rows[0].password;
        const isPasswordCorrect = await bcrypt.compare(password, AmbilHashDariDb);

        if (isPasswordCorrect) {
          return isPasswordCorrect;
        }
        return false;
      }
      return false;
    } catch (error) {
      return (error);
    }
  }
}

module.exports = new AuthService();
