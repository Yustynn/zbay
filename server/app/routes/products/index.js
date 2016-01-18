'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin } from '../../../helpers/routesPermissions'

import { getDocAndDelete, getDocAndSend, getDocAndUpdate, getDocsAndSend, createDoc, getDocsSendAndPopulate }
from '../../../helpers/routesCrud';

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */

router.get('/', getDocsAndSend('Product'));

router.get('/:id', getDocAndSend('Product'));

router.get('/:id/reviews', getDocsSendAndPopulate('Review', 'product', 'user'));

router.post('/', mustBeAdmin, createDoc('Product'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Product'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Product'));
