'use strict';

require('@code-fellows/supergoose');

const jwt = require('jsonwebtoken');
const middleware = require('../../../src/auth/middleware/bearer');
const Users = require('../../../src/auth/models/users');

process.env.SECRET = 'secretkey';

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await new Users(users.admin).save();
});

describe('Auth Middleware', () => {
  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {
    it('fails a login for a user (admin) with an incorrect token', async () => {
      // Arrange (make request match the test)
      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };
      //act
      await middleware(req, res, next);

      //Assertion
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('fails a login for a user (admin) without authorization headers', async () => {
      // Arrange (make request match the test)
      req.headers = {};
      //act
      await middleware(req, res, next);

      //Assertion
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('logs in a user with a proper token', async () => {
      // Arrange
      const tokenObject = {
        username: users.admin.username,
      };
      const token = jwt.sign(tokenObject, process.env.SECRET);
      // Make request match the test
      req.headers = {
        authorization: `Bearer ${token}`,
      };

      // Act
      await middleware(req, res, next);

      //Assertion
      expect(next).toHaveBeenCalledWith();
      expect(req.user.username).toEqual(users.admin.username);
    });
  });
});
