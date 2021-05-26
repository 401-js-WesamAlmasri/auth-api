'use strict';

const middleWare = require('../../../src/middleware/model-finder');

describe('Model finder Middleware', () => {
  // Mock the express req/res/next that we need for each middleware call

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  it('should require the model from file system if it exists first time', async () => {
    // Arrange
    req.params = {
      model: 'food',
    };
    // Act
    await middleWare(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith();
    expect(req.model).toBeDefined();
  });

  it('should require the model from the map object if invoked again', async () => {
    // Arrange
    req.params = {
      model: 'food',
    };
    // Act
    await middleWare(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith();
    expect(req.model).toBeDefined();
  });

  it('should raise an error if the model in params not exsits', async () => {
    // Arrange
    req.params = {
      model: 'foo',
    };
    // Act
    await middleWare(req, res, next);
    // Assert
    expect(next).toHaveBeenCalledWith('Invalid Model');
  });
});
