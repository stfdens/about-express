const joi = require('joi');

const postdata = joi.object({
  nama: joi.string().required(),
  jurusan: joi.string().required(),
  kelas: joi.number().required(),
  nis: joi.number().required(),
  nisn: joi.number().required(),
});

const updateData = joi.object({
  nama: joi.string().required(),
  jurusan: joi.string().required(),
  kelas: joi.number().required(),
  nis: joi.number().required(),
  nisn: joi.number().required(),
});

module.exports = postdata, updateData;
