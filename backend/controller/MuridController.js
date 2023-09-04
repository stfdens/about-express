const muridService = require('../service/MuridService');
const postdata = require('../validations/MuridValidation');
const updateData = require('../validations/MuridValidation');

class MuridController {
  static async addData(req, res) {
    try {
      const { error } = postdata.validate(req.body);
      if (!error) {
        const data = await muridService.AddMurid(req.body);
        if (data) {
          res.status(400).json({ message: data });
        } else {
          res.status(200).json({ message: data });
        }
      } else {
        res.status(400).json({
          message: error.message,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }

  static async getData(req, res) {
    try {
      const datas = await muridService.getMurid();
      res.status(200).json({
        data: datas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }

  static async getDataByNama(req, res) {
    try {
      const data = await muridService.getMuridByNamaAndId(req.params);
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }

  static async updateMuridByName(req, res) {
    try {
      const { error } = await updateData.validate(req.body);
      if (!error) {
        const data = await muridService.updateMurid(req.params, req.body);
        if (!data) {
          res.status(400).json({
            data,
          });
        }
        res.status(200).json({
          message: data,
        });
      } else {
        return res.status(400).json({
          message: error.message,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }

  static async deleteMuridById(req, res) {
    try {
      const data = await muridService.deleteMuridById(req.params);
      res.status(200).json({
        message: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Maaf terjadi kesalahan pada server kami',
      });
    }
  }
}

module.exports = MuridController;
