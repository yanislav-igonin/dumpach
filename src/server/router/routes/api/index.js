const router = require('express').Router();
const boards = require('./boards');

router.use('/boards', boards);

module.exports = router;
