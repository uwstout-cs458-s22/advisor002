const express = require('express');
const log = require('loglevel');
const bodyParser = require('body-parser');
const { isUserLoaded } = require('../services/auth');
const User = require('../controllers/User');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/', isUserLoaded, async (req, res, next) => {
    try {
      // In the future it would be helpful to get an amount of all users in the database and replace the hardcoded value.
      const users = await User.fetchAll(req.session.session_token, 0, 10000000);
      res.render('layout', {
        pageTitle: 'Advisor Admin',
        group: 'admin',
        template: 'index',
        email: req.session.user.email,
        role: req.session.user.role,
        enable: req.session.user.enable,
        data: users,
      });
      log.info(
        `${req.method} ${req.originalUrl} success: rendering admin page with ${users.length} user(s)`
      );
    } catch (error) {
      next(error);
    }
  });

  router.post('/editUser/:id', isUserLoaded, async (req, res, next) => {
    // const currentRole = String(req.session.user.role); // might need to add role to this object
    const requestBody = {
      role: req.session.user.role,
      enable: req.session.user.active,
    };
    try {
      console.log('hit router');
      const response = await User.editUser(req.session.session_token, req.params.id, requestBody);
      res.status(response.status);
      res.send(response);
      // res.redirect(303, '/admin');
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
