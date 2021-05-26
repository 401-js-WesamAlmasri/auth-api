'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../../src/server');
const request = supergoose(server.server);

describe('Error handlers', () => {
  describe('404 Not Found Error Handler', () => {
    //arrange
    const errorObj = {
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    };

    it('should return 404 status error on bad route ', async () => {
      //asct
      const response = await request.get('/foo');
      //assert
      expect(response.status).toBe(404);
      expect(response.body).toEqual(errorObj);
    });

    it('should return 404 status error on bad method ', async () => {
      //act
      const response = await request.get('/signin');
      //assert
      expect(response.status).toBe(404);
      expect(response.body).toEqual(errorObj);
    });
  });

  describe('500 Error handler', () => {
    it('should get 500 status error on a bad module name', async () => {
      const notFoundResponse = {
        status: 500,
        message: 'Invalid Model',
      };
      const response = await request.get('/api/v1/foo');

      expect(response.status).toBe(500);
      expect(response.body).toEqual(notFoundResponse);
    });
  });
});
