const express = require('express');
const log = require('loglevel');
const bodyParser = require('body-parser');
const { isUserLoaded } = require('../services/auth');
const req = require('express/lib/request');
const User = require('../models/User');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.post('/user/edit/:userId', isUserLoaded, async (req, res, next) => {
    const currentRole = String(req.session.user.role); // might need to add role to this object
    const newPermissions = {
      active: req.session.user.active,
      role: req.session.user.role, // or current role depending on if this call works
    };
    try {
      await User.edit(req.session_token, req.params.userId, newPermissions);
      res.redirect(303, '/admin');
    } catch (err) {
      next(err);
    }
  });

  router.delete('/user/:userId', isUserLoaded, async (req, res, next) => {
    try {
      const userID = req.session.users.userId; // this should refer to the value entered in the URL
      await User.deleteUser(req.session.session_token, userID);
      res.redirect('/admin');
    } catch (err) {
      next(err);
    }
  });

  return router;
};
