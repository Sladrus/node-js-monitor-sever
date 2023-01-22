const keysService = require('../service/keys-service');

class KeysController {
  async create(req, res, next) {
    try {
      const user = req.user;
      const { title, list } = req.body;
      const keys = await keysService.create(title, list, user);
      return res.json(keys);
    } catch (e) {
      next(e);
    }
  }

  async updateKey(req, res, next) {
    try {
      const user = req.user;
      const { id, title, list } = req.body;
      const keys = await keysService.update(id, title, list, user);
      return res.json(keys);
    } catch (e) {
      next(e);
    }
  }

  async getOneKey(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const key = await keysService.getOneKey(id, user);
      return res.json(key);
    } catch (e) {
      next(e);
    }
  }

  async getKeys(req, res, next) {
    try {
      const user = req.user;
      const keys = await keysService.getKeys(user);
      return res.json(keys);
    } catch (e) {
      next(e);
    }
  }

  async deleteKey(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const key = await keysService.deleteKey(id, user);
      return res.json(key);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new KeysController();
