module.exports = class AccountDto {
  id;
  api_id;
  api_hash;
  phone;
  key;
  chat;
  project;
  constructor(model) {
    this.id = model._id;
    this.api_id = model.api_id;
    this.api_hash = model.api_hash;
    this.phone = model.phone;
    this.key = model.key;
    this.chat = model?.chat
    this.project = model?.project
  }
};
