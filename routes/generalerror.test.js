/*const request = require('supertest');
const { JSDOM } = require('jsdom');
const log = require('loglevel');
const UserModel = require('../models/User');
const auth = require('../services/auth');

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

describe('Manage Route Tests', () => {
    beforeEach(() => {
        resetMockIsUserLoaded();
    });

    describe('General Error Tests', () => {

        test('404 error test', async () => {

            const response = await request(app).get('/admin');
            const doc = new JSDOM(response.text).window.document;



            //testing to see if the page exists and retrieving it.
            //const error404 = doc.getElementByID('');
            //expect(document.body.contains(error404)).toBe(false);
            expect(doc.querySelector('#test').getAttribute('class')).toBe('card');
            //expect(doc.getElementById("test")).toBe(true);
        });

        test('classTest', async () => {

            const response = await request(app).get('/admin');
            const doc = new JSDOM(response.text).window.document;



            //testing and trying to return that a class is available
            const classTest = doc.getElementByID('');
            expect(doc.body.contains(classTest)).toBe(true);
        });

        test('majorTest', async () => {

            const response = await request(app).get('/admin');
            const doc = new JSDOM(response.text).window.document;

            //testing and trying to return that a major is available
            const majorTest = doc.getElementByID('');
            expect(doc.body.contains(majorTest)).toBe(true);
        });


        test('concentrationTest', async () => {

            const response = await request(app).get('/admin');
            const doc = new JSDOM(response.text).window.document;

            //testing and trying to return that a concentration is available
            const concentrationTest = doc.getElementByID('');
            expect(doc.body.contains(concentrationTest)).toBe(true);
        });
    });
});
*/

const request = require('supertest');
const { JSDOM } = require('jsdom');
const log = require('loglevel');
const UserModel = require('../models/User');
const auth = require('../services/auth');

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

describe('Manage Route Tests', () => {
  beforeEach(() => {
    resetMockIsUserLoaded();
  });

  describe('Manage Index Page Tests', () => {
    test('basic page checks', async () => {
      const response = await request(app).get('/admin');
      const doc = new JSDOM(response.text).window.document;

      // check the main navbar
      expect(doc.querySelector('.navbar-nav>.active').getAttribute('href')).toBe('/admin');
      expect(doc.querySelector('.navbar-nav>.navbar-text').innerHTML).toContain(
        'master@uwstout.edu'
      );
      expect(doc.querySelector('#test').getAttribute('class')).toBe('card');
    });
  });
});
