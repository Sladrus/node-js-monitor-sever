const Router = require('express');
const router = new Router();
const chatController = require('../controllers/chat-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/create', authMiddleware, chatController.create);
router.post('/link/:id', authMiddleware, chatController.linkToAccount);
router.post('/unlink/:id', authMiddleware, chatController.unlinkFromAccount);
router.post('/request', authMiddleware, chatController.createRequest);
router.get('/request', authMiddleware, chatController.getRequests);
router.get('/:id', authMiddleware, chatController.getOneChat);
router.get('/', authMiddleware, chatController.getChats);
router.delete('/:id', authMiddleware, chatController.deleteChat);
router.post('/delete', authMiddleware, chatController.deleteChats);
router.post('/sender', authMiddleware, chatController.createSender);
router.post('/message/:id', authMiddleware, chatController.addMessage);

module.exports = router;
