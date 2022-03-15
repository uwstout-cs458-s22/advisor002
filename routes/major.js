const express = require('express');
const log = require('loglevel');
const bodyParser = require('body-parser');
const { isUserLoaded } = require('../services/auth');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());
  router.get('/', isUserLoaded, async (req, res, next) => {
      res.render('layout', {
        pageTitle: 'Major',
        group: 'major',
        template: 'index',
        email: req.session.user.email,
        major: req.session.user.major,
      });
      log.info(
        `${req.method} ${req.originalUrl} success: rendering major page`
      );
    }
  );

  return router;
};