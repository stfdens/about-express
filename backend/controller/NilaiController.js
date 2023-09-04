const nilaiService = require('../service/NilaiService');
const addNilai = require('../validations/NilaiValidation');
const updateNilai = require('../validations/NilaiValidation');

class NilaiController {
  static async addNilai(req, res) {
    try {
      const { error } = await addNilai.validate(req.body);
      if (!error) {
        const data = await nilaiService.addNilaiS(req.body);
        res.status(200).json({
          message: data,
        });
      }
      res.status(400).json({
        message: error.message,
      });
    } catch (error) {
      return error;
    }
  }

  static async updateNilai(req, res) {
    try {
      const { error } = await updateNilai.validate(req.body);
      if (!error) {
        const data = await nilaiService.editNilaiS(req.params, req.body);
        if (data === 1) {
          res.status(200).json({ message: 'update berhasil' });
        }
        res.status(400).json({ message: 'data tidak ada' });
      }
      res.status(400).json({ message: error.message });
    } catch (error) {
      return error;
    }
  }
}

module.exports = NilaiController;
