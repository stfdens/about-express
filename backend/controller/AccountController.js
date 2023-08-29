const AccountService = require('../service/AccountService');

class AccountController {
  static async addData(req, res) {
    try {
      const accountService = new AccountService();
      await accountService.addAccount(req.body);
      res.status(200).json({
        message: 'Account added successfully.',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'An error occurred.',
      });
    }
  }

  static async getData(req, res) {
    try {
      const accountService = new AccountService();
      const accounts = await accountService.getAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'An error occurred.',
      });
    }
  }

  static async getDataById(req, res) {
    try {
      const accountService = new AccountService();
      const acc = await accountService.getAccountsById(req.params);
      return res.status(200).json({
        data: acc,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateDataById(req, res) {
    try {
      const accountService = new AccountService();
      await accountService.updateAccountById(req.params, req.body);
      return res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDataById(req, res) {
    try {
      const accountService = new AccountService();
      await accountService.deleteAccountById(req.params);
      return res.status(200).json({
        message: 'data berhasil dihapus',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AccountController;
