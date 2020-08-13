const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth-services/local');

const authHelpers = require('../services/auth-services/auth-helpers');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('/index');
});
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/index',
    failureFlash: true,
  })
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

module.exports = authRouter;

