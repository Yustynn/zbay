'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin } from '../../../helpers/routesPermissions'

import { getDocAndDelete, getDocAndUpdate, getDocsAndSend, createDoc }
from '../../../helpers/routesCrud';

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */

router.get('/', getDocsAndSend('Product'));

router.get('/:id', getDocsAndSend('Product'));

router.get('/:id/reviews', getDocsAndSend('Review', 'product'));

router.post('/', mustBeAdmin, createDoc('Product'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Product'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Product'));
