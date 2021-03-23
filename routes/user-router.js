const express = require('express');
const userRouter = express.Router();

const authHelpers = require('../services/auth-services/auth-helpers');
const usersController = require('../controllers/user-controller');

userRouter.get('/', authHelpers.loginRequired, usersController.index);
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});

userRouter.post('/', usersController.create);

userRouter.get('/logout', (req, res) => {
  res.render('/index');
});

module.exports = userRouter;
