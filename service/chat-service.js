const AccountDto = require('../dtos/account-dto');
const ChatDto = require('../dtos/chat-dto');
const ApiError = require('../exceptions/api-error');
const accountModel = require('../models/account-model');
const chatModel = require('../models/chat-model');
const requestModel = require('../models/request-model');
const senderModel = require('../models/sender-model');

class ChatService {
  async create(chats) {
    try {
      var resp = await chatModel.insertMany(chats, {
        ordered: false,
        populate: ['keys'],
      });
    } catch (e) {
      return e.insertedDocs;
    }
    return resp;
  }

  async getChatRequests(chat) {
    const requests = await requestModel.find({ chat: chat }).populate('chat');
    return requests;
  }

  async createRequest(request) {
    const req = await requestModel.create(request);
    console.log(req);
    const chat = await chatModel.findById(req.chat);
    chat.requests.push(req);
    chat.save();
    return req;
  }

  async createSender(sender) {
    const res = await senderModel.create(sender);
    console.log(res);
    const chat = await chatModel.findById(res.chat);
    chat.senders.push(res);
    chat.save();
    return res;
  }

  async getSenders(sender) {
    const res = await senderModel.create(sender);
    console.log(res);
    return res;
  }

  async addMessage(id, message) {
    const sender = await senderModel.findById(id);
    sender.messages.push(message);
    sender.save();
    return sender.messages;
  }

  async linkToAccount(id, userData) {
    const chat = await chatModel.findById(id);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const account = await accountModel.findOne({ chat: id });
    if (account) {
      return account;
    }
    const emptyAccount = await accountModel.findOne({ chat: undefined });
    if (!emptyAccount) {
      throw ApiError.BadRequest('Нет свободных аккаунтов');
    }
    chat.account = id;
    chat.save();

    emptyAccount.chat = id;
    emptyAccount.save();
    return emptyAccount;
  }

  async unlinkFromAccount(id, userData) {
    const chat = await chatModel.findById(id);
    console.log(chat);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const account = await accountModel.findOne({ chat: id });
    if (!account) {
      throw ApiError.BadRequest('Нет аккаунта с таким чатом');
    }
    account.chat = undefined;
    account.save();
    return account;
  }

  async getOneChat(id, userData) {
    const chat = await chatModel.findById(id);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    return chat;
  }

  async getChats(userData) {
    const chats = await chatModel
      .find({ user: userData.id })
      .populate(['keys', 'account', 'requests', 'senders']);

    return chats;
  }

  async getRequests(userData) {
    const reqs = await requestModel
      .find({ user: userData.id })
      .populate('chat');
    return reqs;
  }

  async deleteChat(id, userData) {
    const chat = await chatModel.findById(id);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const resp = await chatModel.deleteOne({ _id: id });
    return resp;
  }
}

module.exports = new ChatService();
