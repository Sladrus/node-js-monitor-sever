const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const projectController = require('../controllers/project-controller');

router.post('/create', authMiddleware, projectController.create);
router.put('/update', authMiddleware, projectController.update);
router.get('/:id', authMiddleware, projectController.getOneProject);
router.get('/', authMiddleware, projectController.getProjects);
router.post('/link', authMiddleware, projectController.linkAccountsToProject);
router.post(
  '/unlink',
  authMiddleware,
  projectController.unlinkAccountsFromProject
);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
