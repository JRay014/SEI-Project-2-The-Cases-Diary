// const db = require('../db/config');

const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const usersSchema = new Schema({
    // this.id = newUser.id || null;
    // this.username = newUser.username;
    // this.password_digest = newUser.password_digest;
  username: {type: String, required: true},
  password: {type: String, required: true},
});
  

const User = model('User', usersSchema);

module.exports = User;