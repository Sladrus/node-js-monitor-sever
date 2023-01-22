const AccountDto = require('../dtos/account-dto');
const ApiError = require('../exceptions/api-error');
const accountModel = require('../models/account-model');

class AccountService {
  async create(accounts) {
    try {
      var resp = await accountModel.insertMany(accounts, { ordered: false });
    } catch (e) {
      return e.insertedDocs;
    }
    var accountsDto = [];
    for (const account of resp) {
      accountsDto.push(new AccountDto(account));
    }
    return accountsDto;
  }

  async linkToUser(user) {
    const count = await accountModel.count({ user: undefined });
    var random = Math.floor(Math.random() * count);
    var account = await accountModel
      .findOne({ user: undefined })
      .skip(random)
      .exec();
    console.log(account);
    if (!account) {
      throw ApiError.BadRequest('Такого не существует');
    }
    account.user = user.id;
    account.save();
    // const rawAccount = await accountModel.aggregate([
    //   { $match: { user: undefined } },
    //   { $sample: { size: 1 } },
    // ]);
    // console.log(rawAccount);
    // const account = await accountModel.findById(rawAccount._id);
    // account.user = user.id;
    // account.save();
    // console.log(account);
    return account;
  }

  async unlinkFromUser(user) {
    const accounts = await accountModel.find({ user: user.id });
    for (var account of accounts) {
      account.user = undefined;
      account.save();
    }
    return accounts;
  }

  async getRandom() {
    const account = await accountModel.aggregate([
      { $match: { user: undefined } },
      { $sample: { size: 1 } },
    ]);
    return account;
  }

  async getOneAccount(id) {
    const account = await accountModel.findById(id);
    return account;
  }

  async getAccounts() {
    const accounts = await accountModel.find();
    // for (const account of accounts) {
    //   account.chat = undefined;
    // }
    return accounts;
  }

  async deleteOne(id) {
    const account = await accountModel.deleteOne({ _id: id });
    return account;
  }
}

module.exports = new AccountService();
