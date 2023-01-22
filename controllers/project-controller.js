const projectService = require('../service/project-service');

class ProjectController {
  async create(req, res, next) {
    try {
      const user = req.user;
      const project = req.body;
      console.log(project);
      const resp = await projectService.create(project, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const user = req.user;
      const project = req.body;
      const resp = await projectService.update(project, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async linkAccountsToProject(req, res, next) {
    try {
      const user = req.user;
      const { id, count } = req.body;
      const resp = await projectService.linkAccountsToProject(id, count, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async unlinkAccountsFromProject(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.body;
      const resp = await projectService.unlinkAccountsFromProjects(id, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }

  async getOneProject(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const project = await projectService.getOneProject(id, user);
      return res.json(project);
    } catch (e) {
      next(e);
    }
  }

  async getProjects(req, res, next) {
    try {
      const user = req.user;
      const projects = await projectService.getProjects(user);
      return res.json(projects);
    } catch (e) {
      next(e);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const resp = await projectService.deleteProject(id, user);
      return res.json(resp);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProjectController();
