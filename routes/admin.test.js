const request = require('supertest');
const { JSDOM } = require('jsdom');
const HttpError = require('http-errors');
const log = require('loglevel');
const User = require('../controllers/User');
const UserModel = require('../models/User');
const auth = require('../services/auth');

beforeAll(() => {
  log.disableAll();
});

jest.mock('../controllers/User', () => {
  return {
    fetchAll: jest.fn(),
    editUser: jest.fn(),
    deleteUser: jest.fn(),
  };
});

jest.mock('../services/environment', () => {
  return {
    port: 3000,
    stytchProjectId: 'project-test-11111111-1111-1111-1111-111111111111',
    stytchSecret: 'secret-test-111111111111',
    masterAdminEmail: 'master@gmail.com',
    automationTestMode: 'true',
  };
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

// a helper that creates an array structure for getUserById
function dataForGetUser(rows, offset = 0) {
  const data = [];
  for (let i = 1; i <= rows; i++) {
    const value = i + offset;
    const params = {
      id: `${value}`,
      email: `email${value}@uwstout.edu`,
      userId: `user-test-someguid${value}`,
      enable: 'false',
      role: 'user',
    };
    data.push(new UserModel(params));
  }
  return data;
}

const app = require('../app')();

describe('Admin Route Tests', () => {
  beforeEach(() => {
    User.fetchAll.mockReset();
    User.fetchAll.mockResolvedValue(null);
    User.editUser.mockReset();
    User.editUser.mockResolvedValue(null);
    User.deleteUser.mockReset();
    User.deleteUser.mockResolvedValue(null);
    resetMockIsUserLoaded();
  });

  describe('Admin Index Page Tests', () => {
    test('should make a call to fetchAll', async () => {
      const data = dataForGetUser(3);
      User.fetchAll.mockResolvedValueOnce(data);
      await request(app).get('/admin');
      expect(User.fetchAll.mock.calls).toHaveLength(1);
      expect(User.fetchAll.mock.calls[0]).toHaveLength(3);
      expect(User.fetchAll.mock.calls[0][0]).toBe('thisisatoken');
      expect(User.fetchAll.mock.calls[0][1]).toBe(0);
      expect(User.fetchAll.mock.calls[0][2]).toBe(100);
    });

    test('basic page checks', async () => {
      const data = dataForGetUser(3);
      User.fetchAll.mockResolvedValueOnce(data);
      const response = await request(app).get('/admin');
      const doc = new JSDOM(response.text).window.document;

      // check the main navbar
      expect(doc.querySelector('.navbar-nav>.active').getAttribute('href')).toBe('/admin');
      expect(doc.querySelector('.dropdown-menu>.dropdown-item').getAttribute('href')).toBe(
        '/profile'
      );
      expect(doc.querySelector('.nav-link.dropdown-toggle.active').innerHTML).toContain(
        'master@uwstout.edu'
      );

      // check the search bar
      const searchBar = doc.getElementById('searchBar');
      expect(doc.body.contains(searchBar)).toBe(true);

      // count the rows
      const rows = doc.querySelectorAll('.card-body>table>tbody>tr');
      expect(rows).toHaveLength(data.length);

      // check the table contents
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i].querySelector('td:nth-child(3)').innerHTML).toBe(data[i].email);
        expect(rows[i].querySelector('td:nth-child(4)').innerHTML).toBe(data[i].role);
      }
    });

    test('basic modal test', async () => {
      const data = dataForGetUser(3);
      User.fetchAll.mockResolvedValueOnce(data);
      const response = await request(app).get('/admin');
      const doc = new JSDOM(response.text).window.document;

      // count/define the rows
      const rows = doc.querySelectorAll('.card-body>table>tbody>tr');
      expect(rows).toHaveLength(data.length);

      // check the modals are being created
      for (let i = 0; i < rows.length; i++) {
        const modal = doc.getElementById('detailModal' + i);
        expect(doc.body.contains(modal)).toBe(true);
      }
    });

    test('User.fetchAll thrown error', async () => {
      User.fetchAll.mockRejectedValue(HttpError(500, `Advisor API Error`));
      const response = await request(app).get('/admin');
      expect(User.fetchAll.mock.calls).toHaveLength(1);
      expect(User.fetchAll.mock.calls[0]).toHaveLength(3);
      expect(User.fetchAll.mock.calls[0][0]).toBe('thisisatoken');
      expect(User.fetchAll.mock.calls[0][1]).toBe(0);
      expect(User.fetchAll.mock.calls[0][2]).toBe(100);
      expect(response.statusCode).toBe(500);
    });
  });

  describe('editUser Route', () => {
    test('should make a call to editUser', async () => {
      const editeduser = {
        id: 1000,
        role: 'user',
        enabled: 'true',
      };
      User.editUser.mockResolvedValue(editeduser);
      await request(app).post('/admin/editUser/1000');
      expect(User.editUser.mock.calls).toHaveLength(1);
      expect(User.editUser.mock.calls[0][0]).toBe('thisisatoken');
    });

    test('editUser throws an error', async () => {
      User.editUser.mockRejectedValue(HttpError(500, 'Advisor API Error'));
      const response = await request(app).post('/admin/editUser/1000');
      expect(User.editUser.mock.calls).toHaveLength(1);
      expect(User.editUser.mock.calls[0][0]).toBe('thisisatoken');
      expect(User.editUser.mock.calls[0][1]).toBe('1000');
      expect(response.statusCode).toBe(500);
    });
  });

  describe('deleteuser Route', () => {
    test('should make a call to deleteUser', async () => {
      const deletedUser = {};
      User.deleteUser.mockResolvedValue(deletedUser);
      await request(app).delete('/admin/user/1000');
      expect(User.editUser.mock.calls).toHaveLength(0);
    });

    test('editUser throws an error', async () => {
      User.editUser.mockRejectedValue(HttpError(500, 'Advisor API Error'));
      const response = await request(app).delete('/admin/user/1000');
      expect(User.editUser.mock.calls).toHaveLength(0);
      expect(response.statusCode).toBe(500);
    });
  });
});
