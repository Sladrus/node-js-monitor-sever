const accountService = require('../service/account-service');

class AccountController {
  async create(req, res, next) {
    try {
      const accounts = req.body;
      const resp = await accountService.create(accounts);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async linkToUser(req, res, next) {
    try {
      const user = req.user;
      const account = await accountService.linkToUser(user);
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }

  async unlinkFromUser(req, res, next) {
    try {
      const user = req.user;
      const accounts = await accountService.unlinkFromUser(user);
      return res.json(accounts);
    } catch (e) {
      next(e);
    }
  }

  async random(req, res, next) {
    try {
      const account = await accountService.getRandom();
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }

  async getOneAccount(req, res, next) {
    try {
      const { id } = req.params;
      const account = await accountService.getOneAccount(id);
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }

  async getAccounts(req, res, next) {
    try {
      const accounts = await accountService.getAccounts();
      return res.json(accounts);
    } catch (e) {
      next(e);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const { id } = req.params;
      const account = await accountService.deleteOne(id);
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AccountController();
