const token = require('../../db/repositories/token');
const user = require('../../db/repositories/user');

module.exports = {
  async login(req, res) {
    try {
      const userData = await user.authenticate(req.body);
      userData.password_hash = undefined;
      userData.created_at = undefined;
      userData.id = undefined;
      res.cookie('token', await token.create(userData, '1h'), {
        httpOnly: false,
        expires: new Date(Date.now() + 900000),
      });
      res.send(userData);
    } catch (e) {
      console.log(e.message);
      res.status(404);
      res.send(e.message);
    }
  },

  async authorize(req, res) {
    try {
      const userData = await user.authenticate(req.body);
      userData.password_hash = undefined;
      userData.created_at = undefined;
      userData.id = undefined;
      res.cookie('token', await token.create(userData, '1h'), {
        httpOnly: false,
        expires: new Date(Date.now() + 900000),
      });
      res.send(userData);
    } catch (e) {
      console.log(e.message);
      res.status(404);
      res.send(e.message);
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.send('ok');
  },
};
