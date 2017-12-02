const router = require('express').Router();
const usersHandlers = require('../../../handlers/users');

router.get('/', usersHandlers.get);

router.post('/login', usersHandlers.login);

router.post('/authorize', usersHandlers.authorize);

router.get('/logout', usersHandlers.logout);

router.delete('/:userId', usersHandlers.remove);

module.exports = router;
