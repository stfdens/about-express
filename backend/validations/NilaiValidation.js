const joi = require('joi');

const addNilai = joi.object({
  nama: joi.string().optional(),
  praktek: joi.number().min(1).max(100).required(),
  harian: joi.number().min(1).max(100).required(),
  ulangan: joi.number().min(1).max(100).required(),
});

const updateNilai = joi.object({
  praktek: joi.number().min(1).max(100).required(),
  harian: joi.number().min(1).max(100).required(),
  ulangan: joi.number().min(1).max(100).required(),
});

module.exports = addNilai, updateNilai;
