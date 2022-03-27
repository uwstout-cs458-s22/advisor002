const express = require('express');
const bodyParser = require('body-parser');
const log = require('loglevel');
const { isUserLoaded } = require('../services/auth');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/', isUserLoaded, async (req, res) => {
    res.render('layout', {
      pageTitle: 'Course Manager',
      group: 'courses',
      template: 'index',
      email: req.session.user.email,
      role: req.session.user.role,
    });
    log.info(`${req.method} ${req.originalUrl} success: rendering course page`);
  });

  return router;
};
