const KeysDto = require('../dtos/keys-dto');
const ApiError = require('../exceptions/api-error');
const keysModel = require('../models/keys-model');

class KeysService {
  async create(title, list, userData) {
    const keys = await keysModel.create({ title, list, user: userData.id });
    if (!keys) {
      throw ApiError.BadRequest('Ошибка при создании ключей');
    }
    const keysDto = new KeysDto(keys);
    return keysDto;
  }

  async update(id, title, list, userData) {
    const key = await keysModel.findById(id);
    if (key.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    key.title = title;
    key.list = list;
    key.save();
    const keyDto = new KeysDto(key);

    return keyDto;
  }

  async getOneKey(id, userData) {
    const key = await keysModel.findById(id);
    if (key.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const keyDto = new KeysDto(key);
    return keyDto;
  }

  async getKeys(userData) {
    const keys = await keysModel.find({ user: userData.id });
    var keyDto = [];
    for (const key of keys) {
      keyDto.push(new KeysDto(key));
    }
    return keyDto;
  }

  async deleteKey(id, userData) {
    const key = await keysModel.findById(id);
    if (key.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    const resp = await keysModel.deleteOne({ _id: id });
    return resp;
  }
}

module.exports = new KeysService();
