module.exports = class KeysDto {
  id;
  title;
  list;
  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.list = model.list;
  }
};
