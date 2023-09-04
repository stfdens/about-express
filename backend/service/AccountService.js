/* eslint-disable no-useless-catch */
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

class AccountService {
  constructor() {
    this._pool = new Pool();
  }

  async duplikatUser(username) {
    try {
      const query = {
        text: 'SELECT username FROM account WHERE username = $1',
        values: [username],
      };

      const result = await this._pool.query(query);

      if (result.rows.length > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  }

  async addAccount({ username, email, password }) {
    try {
      const data = await this.duplikatUser(username);
      if (!data) {
        const hashPassword = await bcrypt.hash(password, 10);

        const query = {
          text: 'INSERT INTO account(username, email, password) VALUES ($1, $2, $3)',
          values: [username, email, hashPassword],
        };

        await this._pool.query(query);
        return 'data berhasil ditambahkan';
      }

      return 'username telah digunakan';
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAccounts() {
    try {
      const query = 'SELECT * FROM account';
      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getAccountsById({ id }) {
    try {
      const query = {
        text: 'SELECT * FROM account WHERE id = $1',
        values: [id],
      };
      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAccountById({ id }, { username, email, password }) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const query = {
        text: 'UPDATE account SET username = $1, email = $2, password = $3 WHERE id = $4',
        values: [username, email, hashPassword, id],
      };

      const result = await this._pool.query(query);
      if (result.rowCount === 0) {
        return { success: false, message: 'not found' };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAccountById({ id }) {
    try {
      const query = {
        text: 'DELETE FROM account WHERE id = $1',
        values: [id],
      };

      await this._pool.query(query);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AccountService();
