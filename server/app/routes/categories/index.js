'use strict';
const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

var mustBeAdmin = function(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.status(401).end();
}

import { getDocAndDelete, getDocAndUpdate, getAllDocsAndSend, createDoc }
from '../../helpers/routesHelper';

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */


// All users can read categories
router.get('/', getAllDocsAndSend('Category'));

router.post('/', mustBeAdmin, createDoc('Category'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Category'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Category'));
