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
        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
          return user;
        }
      }

      return false;
    } catch (error) {
      return (error);
    }
  }
}

module.exports = new AuthService();
