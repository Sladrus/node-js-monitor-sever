const AccountDto = require('../dtos/account-dto');
const ProjectDto = require('../dtos/project-dto');
const ApiError = require('../exceptions/api-error');
const accountModel = require('../models/account-model');
const projectModel = require('../models/project-model');

class ProjectService {
  async create(rawProject, userData) {
    const project = await projectModel.create({
      title: rawProject?.title,
      bot: rawProject?.bot,
      usersList: rawProject?.usersList,
      user: userData.id,
    });
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async update(rawProject, userData) {
    const project = await projectModel.findById(rawProject?.id);
    project.title = rawProject.title;
    project.bot = rawProject.bot;
    project.usersList = rawProject.usersList;
    project.accounts = rawProject.accounts;
    project.save();
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async linkAccountsToProject(id, count, userData) {
    const project = await projectModel.findById(id);
    if (userData.id != project.user) {
      throw ApiError.ForbiddenError();
    }
    if (project.accounts.length) {
      throw ApiError.BadRequest('К этому проекту уже прикреплены аккаунты');
    }
    if (!count) {
      throw ApiError.BadRequest('Невалидное количество аккаунтов');
    }
    const accounts = await accountModel.aggregate([
      { $match: { project: null } },
      { $sample: { size: Number(count) } },
    ]);
    var accountsDto = [];
    for (const account of accounts) {
      account.project = id;
      await accountModel.updateOne(
        { _id: account._id },
        { $set: { project: account.project } }
      );
      accountsDto.push(new AccountDto(account));
    }
    project.accounts = accounts;
    project.save();
    return accountsDto;
  }

  async unlinkAccountsFromProjects(id, userData) {
    const project = await projectModel.findById(id).populate('accounts');
    if (userData.id != project.user) {
      throw ApiError.ForbiddenError();
    }
    const accounts = await accountModel.find({ project: id });
    for (const account of accounts) {
      account.project = null;
      account.save();
    }
    project.accounts = [];
    project.save();
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async getOneProject(id, userData) {
    const project = await projectModel.findById(id).populate('accounts');
    if (userData.id != project.user) {
      throw ApiError.ForbiddenError();
    }
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async getProjects(userData) {
    const projects = await projectModel
      .find({ user: userData.id })
      .populate('accounts');
    var projectsDto = [];
    for (const project of projects) {
      const projectDto = new ProjectDto(project);
      projectsDto.push(projectDto);
    }
    return projectsDto;
  }

  async deleteProject(id, userData) {
    const project = await projectModel.findById(id);
    if (project.user != userData.id) {
      throw ApiError.ForbiddenError();
    }
    console.log(project);
    const resp = await projectModel.deleteOne({ _id: id });
    return resp;
  }
}

module.exports = new ProjectService();
