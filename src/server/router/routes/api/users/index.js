const router = require('express').Router();
const usersHandlers = require('../../../handlers/users');

router.post('/login', usersHandlers.login);

router.post('/authorize', usersHandlers.authorize);

router.get('/logout', usersHandlers.logout);

module.exports = router;
