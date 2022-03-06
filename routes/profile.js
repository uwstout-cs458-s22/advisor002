const express = require('express');
const bodyParser = require('body-parser');
const log = require('loglevel');
const { isUserLoaded } = require('../services/auth');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());
  router.get('/', isUserLoaded, async (req, res) => {
    res.render('layout', {
      pageTitle: 'Advisor Management',
      group: 'profile',
      template: 'index',
      email: req.session.user.email,
      userId: req.session.user.userId,
    });
    log.info(`${req.method} ${req.originalUrl} success: rendering profile page`);
  });

  return router;
};
