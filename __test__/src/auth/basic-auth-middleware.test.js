'use strict';

require('@code-fellows/supergoose');

const { it } = require('@jest/globals');
const middleWare = require('../../../src/auth/middleware/basic');
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
  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {
    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      // Act
      await middleWare(req, res, next);

      // Assertion
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('fails a login for a user without sending the authorization ', async () => {
      // Change the request to match this test case
      req.headers = {};

      // Act
      await middleWare(req, res, next);

      // Assertion
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('logs in an admin user with the right credentials', async () => {
      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };

      // Act
      await middleWare(req, res, next);

      // Assertion
      expect(next).toHaveBeenCalledWith();
    });
  });
});
