'use strict';

process.env.SECRET = 'secretkey';

const server = require('../../../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const Users = require('../../../src/auth/models/users');

const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

describe('v2 API Route', () => {
  let token;
  // Pre-load our database with fake users
  beforeAll(async () => {
    // Create the admin user with all permissions
    await new Users(users.admin).save();

    const response = await mockRequest
      .post('/signin')
      .auth(users.admin.username, users.admin.password);

    token = response.body.token;

  });
  // food end point tests
  describe('food api end point', () => {
    let id;
    let obj;

    it('should create a food record using POST method', async () => {
      obj = {
        name: 'mansaf',
        calories: 500,
        type: 'FRUIT',
      };
      const createResponse = await mockRequest
        .post('/api/v2/food')
        .set('Authorization', `Bearer ${token}`)
        .send(obj);
      expect(createResponse.status).toBe(201);
      expect(createResponse.body.name).toEqual(obj.name);
      expect(createResponse.body.calories).toEqual(obj.calories);
      expect(createResponse.body.type).toEqual(obj.type);
      expect(createResponse.body._id.length).toBeGreaterThan(0);

      id = createResponse.body._id;
    });

    it('should Read a food record using GET method', async () => {
      const recordResponse = await mockRequest
        .get(`/api/v2/food/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(recordResponse.status).toBe(200);
      expect(recordResponse.body.name).toEqual(obj.name);
      expect(recordResponse.body.calories).toEqual(obj.calories);
      expect(recordResponse.body.type).toEqual(obj.type);
    });

    it('should Read a list of records using GET method', async () => {
      const listResponse = await mockRequest
        .get('/api/v2/food/')
        .set('Authorization', `Bearer ${token}`);

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.length).toBe(1);
      expect(listResponse.body[0]._id).toBe(id);
    });

    it('should update a food record using PUT method', async () => {
      const newObj = {
        name: 'maqloba',
        type: 'VEGETABLE',
      };
      const updateResponse = await mockRequest
        .put(`/api/v2/food/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newObj);

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body._id).toEqual(id);
      expect(updateResponse.body.name).toEqual(newObj.name);
      expect(updateResponse.body.calories).toEqual(obj.calories);
      expect(updateResponse.body.type).toEqual(newObj.type);
    });

    it('should Destroy a food record using DELETE method', async () => {
      const destroyResponse = await mockRequest
        .delete(`/api/v2/food/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(destroyResponse.status).toBe(200);
      expect(destroyResponse.body).toEqual({});
    });

    it('should return not Found error on subsequent request to a deleted food record', async () => {
      const destroyResponse = await mockRequest
        .delete(`/api/v2/food/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(destroyResponse.status).toBe(404);
    });
  });

  // clothes end point test
  describe('clothes api end point', () => {
    let id;
    let obj;

    it('should create a cloth record using POST method', async () => {
      obj = {
        name: 'shirt',
        color: 'blue',
        size: 'summer',
      };
      const createResponse = await mockRequest
        .post('/api/v2/clothes')
        .set('Authorization', `Bearer ${token}`)
        .send(obj);

      expect(createResponse.status).toBe(201);
      expect(createResponse.body.name).toEqual(obj.name);
      expect(createResponse.body.color).toEqual(obj.color);
      expect(createResponse.body.size).toEqual(obj.size);
      expect(createResponse.body._id.length).toBeGreaterThan(0);

      id = createResponse.body._id;
    });

    it('should Read a cloth record using GET method', async () => {
      const recordResponse = await mockRequest
        .get(`/api/v2/clothes/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(recordResponse.status).toBe(200);
      expect(recordResponse.body.name).toEqual(obj.name);
      expect(recordResponse.body.color).toEqual(obj.color);
      expect(recordResponse.body.size).toEqual(obj.size);
    });

    it('should Read a list of cloth records using GET method', async () => {
      const listResponse = await mockRequest
        .get('/api/v2/clothes/')
        .set('Authorization', `Bearer ${token}`);

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.length).toBe(1);
      expect(listResponse.body[0]._id).toBe(id);
    });

    it('should update a cloth record using PUT method', async () => {
      const newObj = {
        name: 'jacket',
        color: 'white',
      };
      const updateResponse = await mockRequest
        .put(`/api/v2/clothes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newObj);

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body._id).toEqual(id);
      expect(updateResponse.body.name).toEqual(newObj.name);
      expect(updateResponse.body.color).toEqual(newObj.color);
      expect(updateResponse.body.size).toEqual(obj.size);
    });

    it('should Destroy a cloth record using DELETE method', async () => {
      const destroyResponse = await mockRequest
        .delete(`/api/v2/clothes/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(destroyResponse.status).toBe(200);
      expect(destroyResponse.body).toEqual({});
    });

    it('should return not Found error on subsequent request to a deleted clothes record', async () => {
      const destroyResponse = await mockRequest
        .delete(`/api/v2/clothes/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(destroyResponse.status).toBe(404);
    });
  });
});
