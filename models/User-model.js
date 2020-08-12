const db = require('../db/config');

class User {
  constructor(newUser) {
    this.id = newUser.id || null;
    this.username = newUser.username;
    this.password_digest = newUser.password_digest;
  }

  static findByUserName(username) {
    return db
      .oneOrNone('SELECT * FROM users WHERE username = $1', username)
      .then((user) => {
        if (user) return new this(user);
        else throw new Error('User not found');
      });
  }

  save() {
    return db
      .one(
        `INSERT INTO users
        (username, epassword_digest)
        VALUES ($/username/, $/password_digest/)
        RETURNING *`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }
}

module.exports = User;