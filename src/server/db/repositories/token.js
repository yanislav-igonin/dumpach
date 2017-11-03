const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');

bluebird.promisifyAll(jwt);

const create = async (data, expiresIn) => {
  return await jwt.sign(
    {
      data,
    },
    process.env.SECRET,
    { expiresIn: expiresIn }
  );
};

const validate = async (req, next) => {
  console.log(req);
  // try {
  //   const decoded = await jwt.verify(ctx.cookies.get('token'), 'secret');
  //   if (decoded.exp > Date.now()) {
  //     throw new Error('token expired');
  //   }
  //   next(ctx);
  // } catch (e) {
  //   ctx.status = 401;
  //   ctx.body = e.message;
  // }
};

module.exports = {
  create,
  validate,
};
