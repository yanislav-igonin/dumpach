const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const get = async () => {
  try {
    const users = await db.query('SELECT * FROM users')
    return users;
  } catch (e) {
    throw new Error(e.message);
  }
}

const remove = async (userId) => {
  try {
    db.query('DELETE FROM users WHERE id=$1', [userId])
    return 'User deleted';
  } catch (e) {
    throw new Error(e.message);
  }
}

const create = async (user) => {
  try {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const data = await db.one(
      `INSERT INTO users(login, password_hash) 
      VALUES($1, $2)`,
      [user.email, passwordHash]
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const authenticate = async (user) => {
  try {
    const data = await db.one('SELECT * FROM users WHERE login=$1', [user.login]);
    const compareResult = await bcrypt.compare(user.password, data.password_hash);
    if (compareResult === true) {
      return Object.assign(
        data,
        await db.one(
          `UPDATE users 
          SET last_login_at=DEFAULT 
          WHERE login=$1 
          RETURNING last_login_at`,
          [user.login]
        )
      );
    } else {
      throw new Error('Wrong username or password');
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const authorize = async (user) => {
  try {
    const userData = Object.assign(
      user,
      await db.one(
        `UPDATE users 
        SET last_login_at=DEFAULT 
        WHERE login=$1 
        RETURNING last_login_at`,
        [user.login]
      )
    );
    return userData;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  get,
  remove,
  create,
  authenticate,
  authorize,
};
