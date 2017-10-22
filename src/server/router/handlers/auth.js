const token = require('../../db/repositories/token');
const user = require('../../db/repositories/user');

module.exports = {
  async login(req, res) {
    console.log(req);
    try {
      const userData = await user.authenticate(req.body);
      userData.password_hash = undefined;
      userData.created_at = undefined;
      userData.id = undefined;
      res.cookie('token', await token.create(userData, '1h'), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
      });
      res.send(userData);
    } catch (e) {
      console.log(e.message);
      res.status(404);
      res.send(e.message);
    }
  },

  async logout(req, res) {
    console.log(req);
    res.clearCookie('token');
    res.send('ok');
  },
};
