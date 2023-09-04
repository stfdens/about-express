const { Pool } = require('pg');

class NilaiService {
  constructor() {
    this._pool = new Pool();
  }

  async isDuplicatNama({ nama }) {
    const query = {
      text: 'SELECT * FROM nilai WHERE nama = $1',
      values: [nama],
    };
    const data = await this._pool.query(query);
    console.log(data.rows.length);
    return data.rows.length > 0;
  }

  async addNilaiS({ nama, praktek, harian, ulangan }) {
    try {
      const data = await this.isDuplicatNama({ nama });
      if (data) {
        return 'data sudah ada';
      }
      const query = {
        text: 'INSERT INTO nilai (nama, praktek, harian, ulangan) VALUES ($1, $2, $3, $4)',
        values: [nama, praktek, harian, ulangan],
      };

      await this._pool.query(query);
      return 'sudah ditambahkan';
    } catch (error) {
      return error;
    }
  }

  async editNilaiS({ nama }, { praktek, harian, ulangan }) {
    try {
      const query = {
        text: 'UPDATE nilai SET praktek = $1, harian = $2, ulangan = $3 WHERE nama = $4',
        values: [praktek, harian, ulangan, nama],
      };

      const data = await this._pool.query(query);

      if (data.rowCount === 0) {
        return data.rowCount;
      }

      return data.rowCount;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new NilaiService();
