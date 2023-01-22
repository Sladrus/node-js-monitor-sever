module.exports = class ChatDto {
  id;
  link;

  constructor(model) {
    this.id = model._id;
    this.link = model.link;
  }
};
