const express = require('express');
const bodyParser = require('body-parser');
const log = require('loglevel');
const { isUserLoaded } = require('../services/auth');
const Course = require('../controllers/Course');

module.exports = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/', isUserLoaded, async (req, res) => {
    const criteria = '';
    const courses = await Course.findAll(req.session.session_token, criteria, 0, 100);

    res.render('layout', {
      pageTitle: 'Course Manager',
      group: 'courses',
      template: 'index',
      email: req.session.user.email,
      role: req.session.user.role,
      data: courses,
    });
    log.info(`${req.method} ${req.originalUrl} success: rendering course page`);
  });

  router.delete('/remove/:id', isUserLoaded, async (req, res, next) => {
    try{
      log.info(`here is the requested id: ${res.params.id}`);
      Course.deleteCourse(req.session.session_token, req.params.id);
      
    }
    catch (error){
      next(error);
    }
  })
  router.get('/:courseId', isUserLoaded, async (req, res, next) => {
    try {
      const courseId = req.session.courses.courseId;
      const criteria = ' where courseId =' + courseId;
      const courses = await Course.findAll({ criteria: criteria });
      log.info(`${req.method} ${req.originalUrl} success: returning courses ${courseId}`);
      return res.send(courses);
    } catch (error) {
      next(error);
    }
  });

  

  return router;
};