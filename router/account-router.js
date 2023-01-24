const Router = require('express');
const router = new Router();
const accountController = require('../controllers/account-controller');
const adminMiddlware = require('../middleware/admin-middlware');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/create', authMiddleware, accountController.create);
router.get('/:id', adminMiddlware, accountController.getOneAccount);
router.get('/', authMiddleware, accountController.getAccounts);
router.delete('/:id', authMiddleware, accountController.deleteAccount); //поправить на админку
router.post('/link', authMiddleware, accountController.linkToUser);
router.post('/unlink', authMiddleware, accountController.unlinkFromUser);

module.exports = router;
