const { Pool } = require('pg');

class MuridService {
  constructor() {
    this._pool = new Pool();
  }

  async AddMurid({ nama, jurusan, kelas, nis, nisn }) {
    try {
        const query = {
            text: 'INSERT INTO murid (nama, jurusan, kelas, nis, nisn) VALUES ($1, $2, $3, $4, $5)',
            values: [nama, jurusan, kelas, nis, nisn]
        }
        await this._pool.query(query);
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async getMurid() {
    try {
        const query = {
            text: 'SELECT * FROM murid'
        }

        const data = await this._pool.query(query);
        return data.rows;
    } catch (error) {
        console.error(error);
    }
  }

  async getMuridByNama({nama}) {
    try {
        const query = {
            text: 'SELECT * FROM murid WHERE nama = $1',
            values: [nama]
        }

        const data = await this._pool.query(query);
        return data.rows
    } catch (error) {
        console.error(error);
    }
  }

  async updateMurid({id}, {nama, jurusan, kelas, nis, nisn }) {
    try {
        const query = {
            text: 'UPDATE murid SET nama = $1, jurusan = $2, kelas = $3, nis = $4, nisn = $5 WHERE id = $6',
            values: [nama, jurusan, kelas, nis, nisn, id]
        }

        await this._pool.query(query);
    } catch (error) {
        console.error(error);
    }
  }

  async deleteMuridByName({nama}) {
    try {
        const query = {
            text: 'DELETE FROM murid WHERE nama = $1',
            values: [nama]
        }

        await this._pool.query(query);
    } catch (error) {
        console.error(error);
    }
  }
}

module.exports = new MuridService();
