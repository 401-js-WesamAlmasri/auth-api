'use strict';

const modelFider = require('../middleware/model-finder');
const express = require('express');
const bearerAuth = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');

const router = express.Router();

router.param('model', modelFider);

// user bearer auth middleware for all routes
router.use(bearerAuth);

// apply permissions using acl middleware
router.get('*', permissions('read'));
router.post('*', permissions('create'));
router.put('*', permissions('update'));
router.put('*', permissions('update'));
router.delete('*', permissions('delete'));

// routes
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (e) {
    next(e);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (e) {
    next(e);
  }
}

async function handleCreate(req, res, next) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (e) {
    next(e);
  }
}

async function handleUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (e) {
    next(e);
  }
}

async function handleDelete(req, res, next) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    if (deletedRecord) {
      res.status(200).json({});
    }
    const errorObject = {
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    };
    res.status(404).json(errorObject);
  } catch (e) {
    next(e);
  }
}

module.exports = router;
