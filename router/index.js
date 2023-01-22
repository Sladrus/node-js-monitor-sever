const Router = require('express').Router;
const router = new Router();
const userRouter = require('./user-router');
const chatRouter = require('./chat-router');
const accountRouter = require('./account-router');
const keysRouter = require('./keys-router');
const projectRouter = require('./project-router');

router.use('/user', userRouter);
router.use('/chats', chatRouter);
router.use('/accounts', accountRouter);
router.use('/keys', keysRouter);
router.use('/projects', projectRouter);

module.exports = router;
