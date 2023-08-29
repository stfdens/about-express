const express = require('express');
const AccountController = require('../controller/AccountController');

const router = express.Router();

router.post('/account', AccountController.addData);
router.get('/account', AccountController.getData);
router.get('/account/:id', AccountController.getDataById);
router.put('/account/:id', AccountController.updateDataById);
router.delete('/account/:id', AccountController.deleteDataById);

module.exports = router;
