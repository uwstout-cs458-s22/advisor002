// const request = require('supertest');
// const { JSDOM } = require('jsdom');
// const log = require('loglevel');
// const UserModel = require('../models/User');
// const auth = require('../services/auth');

// beforeAll(() => {
//   log.disableAll();
// });

// const mockUser = new UserModel({
//   id: '1000',
//   email: 'master@uwstout.edu',
//   userId: 'user-test-someguid',
//   enable: 'true',
//   role: 'admin',
// });

// jest.mock('../services/auth', () => {
//   return {
//     authenticateUser: jest.fn(),
//     revokeSession: jest.fn(),
//     isUserLoaded: jest.fn(),
//   };
// });

// function resetMockIsUserLoaded() {
//   auth.isUserLoaded.mockImplementation((req, res, next) => {
//     req.session = {
//       session_token: 'thisisatoken',
//       user: mockUser,
//     };
//     next();
//   });
// }

// const app = require('../app')();

// describe('Manage Route Tests', () => {
//   beforeEach(() => {
//     resetMockIsUserLoaded();
//   });

//   describe('Course Index Page Tests', () => {
//     test('basic page checks', async () => {
//       const response = await request(app).get('/courses');
//       const doc = new JSDOM(response.text).window.document;

//       // check the main navbar
//       expect(doc.querySelector('.navbar-nav>.active').getAttribute('href')).toBe('/courses');
//       expect(doc.querySelector('.navbar-nav>.navbar-text').innerHTML).toContain(
//         'master@uwstout.edu'
//       );
//     });
//   });
// });
const request = require('supertest');
const { JSDOM } = require('jsdom');
const log = require('loglevel');
const UserModel = require('../models/User');
const auth = require('../services/auth');
const Course = require('../controllers/Courses');
const HttpError = require('http-errors');

beforeAll(() => {
  log.disableAll();
});

const mockUser = new UserModel({
  id: '1000',
  email: 'master@uwstout.edu',
  userId: 'user-test-someguid',
  enable: 'true',
  role: 'admin',
});

jest.mock('../services/auth', () => {
  return {
    authenticateUser: jest.fn(),
    revokeSession: jest.fn(),
    isUserLoaded: jest.fn(),
  };
});

jest.mock('../controllers/Courses', () => {
  return {
    createCourse: jest.fn(),
    editCourse: jest.fn(),
    findAll: jest.fn(),
    addToTerm: jest.fn(),
  };
});

function resetMockIsUserLoaded() {
  auth.isUserLoaded.mockImplementation((req, res, next) => {
    req.session = {
      session_token: 'thisisatoken',
      user: mockUser,
    };
    next();
  });
}

const app = require('../app')();

describe('Courses Route Tests', () => {
  beforeEach(() => {
    Course.createCourse.mockReset();
    Course.createCourse.mockResolvedValue(null);
    Course.editCourse.mockReset();
    Course.editCourse.mockResolvedValue(null);
    Course.findAll.mockReset();
    Course.findAll.mockResolvedValue({ name: 'test-course' });
    Course.editCourse.mockReset();
    Course.editCourse.mockResolvedValue(null);
    Course.addToTerm.mockReset();
    Course.addToTerm.mockResolvedValue(null);
    resetMockIsUserLoaded();
  });

  describe('createCourse Route', () => {
    test('should make a call to createCourse', async () => {
      Course.createCourse.mockResolvedValueOnce({});
      await request(app).post('/courses/createCourse');
      expect(Course.createCourse.mock.calls).toHaveLength(1);
      expect(Course.createCourse.mock.calls[0][0]).toBe('thisisatoken');
    });

    test('createCourse throws an error', async () => {
      Course.createCourse.mockRejectedValue(HttpError(500, 'Advisor API Error'));
      const response = await request(app).post('/courses/createCourse');
      expect(Course.createCourse.mock.calls).toHaveLength(1);
      expect(Course.createCourse.mock.calls[0][0]).toBe('thisisatoken');
      expect(response.statusCode).toBe(500);
    });
  });

  describe('editCourse Route', () => {
    test('should make a call to editCourse', async () => {
      Course.editCourse.mockResolvedValueOnce({});
      await request(app).post('/courses/editCourse/1');
      expect(Course.editCourse.mock.calls).toHaveLength(1);
      expect(Course.editCourse.mock.calls[0][0]).toBe('thisisatoken');
    });

    test('editCourse throws an error', async () => {
      Course.editCourse.mockRejectedValue(HttpError(500, 'Advisor API Error'));
      const response = await request(app).post('/courses/editCourse/1');
      expect(Course.editCourse.mock.calls).toHaveLength(1);
      expect(Course.editCourse.mock.calls[0][0]).toBe('thisisatoken');
      expect(response.statusCode).toBe(500);
    });
  });

  describe('Course Index Page Tests', () => {
    test('basic page checks', async () => {
      const response = await request(app).get('/courses');
      const doc = new JSDOM(response.text).window.document;
      // check the main navbar
      expect(doc.querySelector('.navbar-nav>.active').getAttribute('href')).toBe('/courses');
      expect(doc.querySelector('.dropdown-menu>.dropdown-item').getAttribute('href')).toBe(
        '/profile'
      );
      expect(doc.querySelector('.nav-link.dropdown-toggle.active').innerHTML).toContain(
        'master@uwstout.edu'
      );

      // check for create course button
      const createCourseButton = doc.getElementById('create-course-button');
      expect(doc.body.contains(createCourseButton)).toBe(true);
    });
  });
});
