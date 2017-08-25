const router = require('express').Router();
const api = require('./routes/api');

router.use('/api', api);

module.exports = router;
