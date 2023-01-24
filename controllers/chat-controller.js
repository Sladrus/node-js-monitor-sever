const chatService = require('../service/chat-service');

class ChatController {
  async create(req, res, next) {
    try {
      const chats = req.body;
      const resp = await chatService.create(chats);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async createRequest(req, res, next) {
    try {
      const user = req.user;
      const request = req.body;
      const resp = await chatService.createRequest(request, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async createSender(req, res, next) {
    try {
      const sender = req.body;
      console.log(sender);
      const resp = await chatService.createSender(sender);
      console.log(resp);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async addMessage(req, res, next) {
    try {
      const { id } = req.params;
      const message = req.body;
      const resp = await chatService.addMessage(id, message);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async linkToAccount(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const account = await chatService.linkToAccount(id, user);
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }

  async unlinkFromAccount(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const account = await chatService.unlinkFromAccount(id, user);
      return res.json(account);
    } catch (e) {
      next(e);
    }
  }

  async getOneChat(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const chat = await chatService.getOneChat(id, user);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async getChats(req, res, next) {
    try {
      const user = req.user;
      const chats = await chatService.getChats(user);
      return res.json(chats);
    } catch (e) {
      next(e);
    }
  }

  async getRequests(req, res, next) {
    try {
      const user = req.user;
      const reqs = await chatService.getRequests(user);
      return res.json(reqs);
    } catch (e) {
      next(e);
    }
  }

  async deleteChat(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const chat = await chatService.deleteChat(id, user);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatController();
