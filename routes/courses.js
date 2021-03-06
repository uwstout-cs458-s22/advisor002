const express = require('express');
const bodyParser = require('body-parser');
const log = require('loglevel');
const { isUserLoaded } = require('../services/auth');
const Course = require('../controllers/Courses');

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

  router.get('/remove/:id', isUserLoaded, async (req, res, next) => {
    try{
      log.info(`here is the requested id: ${req.params.id}`);
      Course.deleteCourse(req.session.session_token, req.params.id);
      return res.redirect('/courses');
    }
    catch (error){
      next(error);
    }
  })
  router.get('/:courseId', isUserLoaded, async (req, res, next) => {
    try {
     
      const courseId = req.params.courseId;
      
      const criteria = ' where id =' + courseId;
      const courses = await Course.findAll({ criteria: criteria });
      log.info(`${req.method} ${req.originalUrl} success: returning courses ${courseId}`);
      return res.send(courses);
    } catch (error) {
      next(error);
    }
  });

  router.post('/createCourse', isUserLoaded, async (req, res, next) => {
    try {
      const requestBody = [
        {
          name: req.body.name,
          credits: req.body.credits,
          section: 1, // TODO: Change
        },
      ];
      const response = await Course.createCourse(req.session.session_token, requestBody);
      res.status(response.status);
      res.send(response);
    } catch (error) {
      next(error);
    }
  });

  router.post('/editCourse/:id', isUserLoaded, async (req, res, next) => {
    try {
      const id = req.params.id;

      const requestBody = {
        name: req.body.name,
        credits: req.body.credits,
        section: 1, // TODO: Change
      };
      const response = await Course.editCourse(req.session.session_token, requestBody, id);
      res.status(response.status);
      res.send(response);
    } catch (error) {
      next(error);
    }
  });

  /*
  router.post('/addToTerm/:id', isUserLoaded, async (req, res, next) => {
    try {
      const id = req.params.id;

      const requestBody = {
        name: req.body.name,
        credits: req.body.credits,
        section: req.body.section,
      };
      const response = await Course.editCourse(req.session.session_token, requestBody, id);
      res.status(response.status);
      res.send(response);
    } catch (error) {
      next(error);
    }
  });
  */

  // router.delete('/remove/:id', isUserLoaded, async (req, res, next) => {});

  return router;
};