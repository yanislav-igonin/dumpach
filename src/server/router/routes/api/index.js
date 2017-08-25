const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('api');
});

module.exports = router;
