const express = require('express');
const log = require('loglevel');
const bodyParser = require('body-parser');
const { isUserLoaded } = require('../services/auth');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());
  router.get('/', isUserLoaded, async (req, res, next) => {
    res.render('layout', {
      pageTitle: 'Terms',
      group: 'terms',
      template: 'index',
      email: req.session.user.email,
      major: '',
      role: req.session.user.role,
    });
    log.info(`${req.method} ${req.originalUrl} success: rendering terms page`);
  });

  return router;
};
