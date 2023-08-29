/* eslint-disable no-useless-catch */
const { Pool } = require('pg');

class AccountService {
  constructor() {
    this._pool = new Pool();
  }

  async addAccount({ username, email, password }) {
    try {
      const query = {
        text: 'INSERT INTO account(username, email, password) VALUES ($1, $2, $3)',
        values: [username, email, password],
      };

      await this._pool.query(query);
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
      const query = {
        text: 'UPDATE account SET username = $1, email = $2, password = $3 WHERE id = $4',
        values: [username, email, password, id],
      };

      await this._pool.query(query);
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

module.exports = AccountService;
