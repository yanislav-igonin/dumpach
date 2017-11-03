const router = require('express').Router();
const authHandlers = require('../../../handlers/auth');

router.post('/login', authHandlers.login);

router.get('/logout', authHandlers.logout);

module.exports = router;
