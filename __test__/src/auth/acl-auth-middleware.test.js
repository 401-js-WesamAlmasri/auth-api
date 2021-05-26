'use Strict';

require('@code-fellows/supergoose');

const permissions = require('../../../src/auth/middleware/acl');

let acl = {
  user: ['read'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete'],
};

describe('Auth middleware', () => {
  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {};
  const next = jest.fn();

  describe('User permissions', () => {
    describe('Read Permisstion', () => {
      Object.keys(acl).forEach((userType) => {
        it(`give read permission to ${userType} role`, async () => {
          // Make the request match the test
          req.user = {
            capabilities: acl[userType],
          };
          // Act
          await permissions('read')(req, res, next);
          // Assertion
          expect(next).toHaveBeenCalledWith();
        });
      });
    });

    describe('Write Permisstion', () => {
      Object.keys(acl).slice(1).forEach((userType) => {
        it(`give write permission to ${userType} role`, async () => {
          // Make the request match the test
          req.user = {
            capabilities: acl[userType],
          };
          // Act
          await permissions('write')(req, res, next);
          // Assertion
          expect(next).toHaveBeenCalledWith();
        });
      });

      it(`not give write permission to ${
        Object.keys(acl)[0]
      } role`, async () => {
        // Make the request match the test
        req.user = {
          capabilities: acl[acl[0]],
        };
        // Act
        await permissions('write')(req, res, next);
        // Assertion
        expect(next).toHaveBeenCalledWith('Access Denied');
      });
    });

    describe('Delete Permisstion', () => {
      it(`give delete permission to ${Object.keys(acl)[2]} role`, async () => {
        // Make the request match the test
        req.user = {
          capabilities: acl[Object.keys(acl)[2]],
        };
        // Act
        await permissions('delete')(req, res, next);
        // Assertion
        expect(next).toHaveBeenCalledWith();
      });

      Object.keys(acl).slice(0, 2).forEach((userType) => {
        it(`not give delete permission to ${userType} role`, async () => {
          // Make the request match the test
          req.user = {
            capabilities: acl[userType],
          };
          // Act
          await permissions('delete')(req, res, next);
          // Assertion
          expect(next).toHaveBeenCalledWith('Access Denied');
        });
      });
    });
    describe('Invalid Login', () => {
      it('not give permission if login was invalid', async () => {
        // Make the request match the test
        req.user = {};
        // Act
        await permissions('read')(req, res, next);
        // Assertion
        expect(next).toHaveBeenCalledWith('Invalid Login');
      });
    });
  });
});
