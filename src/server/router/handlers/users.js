const token = require('../../db/repositories/token');
const users = require('../../db/repositories/users');

module.exports = {
  async get(req,res) {
    try {
      await token.validate(req.cookies.token);
      const usersList = await users.get();
      res.send(usersList);
    } catch (e) {
      res.send(e.message);
    }
  },

  async remove(req,res) {
    try {
      await token.validate(req.cookies.token);
      const result = await users.remove(req.params.userId);
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  },

  async login(req, res) {
    try {
      const userData = await users.authenticate(req.body);
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
      const decoded = await token.validate(req.cookies.token);
      const userData = await users.authorize(decoded.data);
      res.cookie('token', await token.create(userData, '1h'), {
        httpOnly: false,
        expires: new Date(Date.now() + 900000),
      });
      res.send(userData);
    } catch (e) {
      console.log(e.message);
      res.status(401);
      res.send(e.message);
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.send('ok');
  },
};
