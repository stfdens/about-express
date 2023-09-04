const { Pool } = require('pg');
const MapDbToModelAccount = require('../utils/MapDbToModelAccount');

class MuridService {
  constructor() {
    this._pool = new Pool();
  }

  async isDuplicate({ nis, nisn }) {
    const query = {
      text: 'SELECT * FROM murid WHERE nis = $1 AND nisn = $2',
      values: [nis, nisn],
    };
    const data = await this._pool.query(query);
    return data.rows.length > 0;
  }

  async AddMurid({ nama, jurusan, kelas, nis, nisn }) {
    try {
      const cekdata = await this.isDuplicate({ nis, nisn });
      if (cekdata) {
        // jika ada data duplikat
        return 'data sudah ada';
      }
      // jika data tidak ada
      const query = {
        text: 'INSERT INTO murid (nama, jurusan, kelas, nis, nisn) VALUES ($1, $2, $3, $4, $5)',
        values: [nama, jurusan, kelas, nis, nisn],
      };
      await this._pool.query(query);
      return 'Data berhasil ditambahkan';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMurid() {
    try {
      const query = {
        text: 'SELECT * FROM murid',
      };

      const data = await this._pool.query(query);
      return data.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async getMuridAndNilaiS({ nama }) {
    try {
      const query = {
        text: 'SELECT * FROM murid JOIN nilai ON murid.nama = nilai.nama WHERE murid.nama = $1',
        values: [nama],
      };

      const data = await this._pool.query(query);

      if (data.rowCount === 0) {
        return 'data tidak ada';
      }

      return data.rows.map(MapDbToModelAccount);
    } catch (error) {
      console.log(error);
    }
  }

  async getMuridByNamaAndId({ nama, id }) {
    try {
      const query = {
        text: 'SELECT * FROM murid WHERE nama = $1 OR id = $2',
        values: [nama, id],
      };

      const data = await this._pool.query(query);
      if (data.rowCount === 0) {
        return 'tidak ada data';
      }

      return data.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async updateMurid({ id }, { nama, jurusan, kelas, nis, nisn }) {
    try {
      // Cek apakah ada duplikasi setelah pembaruan
      const cekdata = await this.isDuplicate({ nis, nisn });
      if (cekdata) {
        return 'Data sudah ada, tidak berhasil diupdate';
      }

      // Cek apakah data dengan ID yang diberikan ada di database
      const query = {
        text: 'UPDATE murid SET nama = $1, jurusan = $2, kelas = $3, nis = $4, nisn = $5 WHERE id = $6',
        values: [nama, jurusan, kelas, nis, nisn, id],
      };
      const updateResult = await this._pool.query(query);

      if (updateResult.rowCount === 0) {
        return 'Tidak ada data dengan ID yang diberikan';
      }

      return 'Data berhasil diupdate';
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMuridById({ id }) {
    try {
      const query = {
        text: 'DELETE FROM murid WHERE id = $1',
        values: [id],
      };

      const data = await this._pool.query(query);

      if (data.rowCount === 0) {
        return 'data tidak ada';
      }

      return 'data berhasil dihapus';
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new MuridService();
