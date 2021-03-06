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
      const response = await request(app).get('/manage');
      const doc = new JSDOM(response.text).window.document;

      // check the main navbar
      expect(doc.querySelector('#termsLink').getAttribute('href')).toBe('/terms');
      expect(doc.querySelector('.dropdown-item').getAttribute('href')).toBe(
        '/profile'
      );
      expect(doc.querySelector('.nav-link.dropdown-toggle.active').innerHTML).toContain(
        'master@uwstout.edu'
      );
    });
  });
});

test('Testing Add Button', async () => {

  // const response = await request(app).get('/terms');

  // const doc = new JSDOM(response.text).window.document;
  // doc.submitTerm();

  // expect(doc.getElementByID(testingDiv).innerHTML = "test completed");

})
