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

  async createRequest(request, userData) {
    const req = await requestModel.create({ ...request, user: userData.id });
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
    console.log('START1 ' + id);
    var chat = await chatModel.findById(id);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const account = await accountModel.findOne({ chat: id });
    if (account) {
      console.log(account);
      return account;
    }
    console.log('START2 ' + id);

    var emptyAccount = await accountModel.findOne({ chat: undefined });
    if (!emptyAccount) {
      throw ApiError.BadRequest('Нет свободных аккаунтов');
    }
    console.log('START3 ' + id);

    console.log(emptyAccount);
    chat.account = emptyAccount._id;
    chat.save();

    emptyAccount.chat = id;
    emptyAccount.save();
    return emptyAccount;
  }

  async unlinkFromAccount(id, userData) {
    const chat = await chatModel.findById(id);
    if (chat.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const account = await accountModel.findOne({ chat: id });
    if (!account) {
      throw ApiError.BadRequest('Нет аккаунта с таким чатом');
    }
    if (chat) {
      chat.account = undefined;
      chat.save();
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
    // for (var chat of chats) {
    //   chat.account = undefined;
    //   chat.save();
    // }
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
    const account = await accountModel.findOne({ chat: id });
    if (account) {
      account.chat = undefined;
      account.save();
    }

    const resp = await chatModel.deleteOne({ _id: id });
    return resp;
  }

  async deleteChats(body, userData) {
    const chats = await chatModel.find({ _id: { $in: [...body] } });
    for (const chat of chats) {
      if (chat.user != userData.id) {
        throw ApiError.ForbiddenError();
      }
      const account = await accountModel.findOne({ chat: chat.account });
      if (account) {
        account.chat = undefined;
        account.save();
      }
    }

    const resp = await chatModel.deleteMany({ _id: { $in: [...body] } });
    return resp;
  }
}
module.exports = new ChatService();
