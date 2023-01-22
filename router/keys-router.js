const Router = require('express');
const router = new Router();
const keysController = require('../controllers/keys-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/create', authMiddleware, keysController.create);
router.put('/update', authMiddleware, keysController.updateKey)
router.get('/:id', authMiddleware, keysController.getOneKey);
router.get('/', authMiddleware, keysController.getKeys);
router.delete('/:id', authMiddleware, keysController.deleteKey);

module.exports = router;
