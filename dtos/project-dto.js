module.exports = class ProjectDto {
  id;
  title;
  bot;
  usersList;
  accounts;
  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.bot = model?.bot;
    this.usersList = model?.usersList;
    this.accounts = model?.accounts;
  }
};
