const jwt = require('jsonwebtoken');

Promise.promisifyAll(jwt);

const create = async (data, expiresIn) => {
  return await jwt.sign(
    {
      data,
    },
    process.env.SECRET,
    { expiresIn: expiresIn }
  );
};

const validate = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded.exp > Date.now()) {
      throw new Error('token expired');
    }
    return decoded;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  create,
  validate,
};
