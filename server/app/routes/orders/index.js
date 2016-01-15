'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
  createDoc,
  getDocsAndSend,
  getDocAndSendIfOwnerOrAdmin,
  getDocAndUpdateIfOwnerOrAdmin,
  getDocAndDeleteIfOwnerOrAdmin
} from '../../../helpers/routesCrud';

/**
 * CRUD operations
 * Admin gets all orders for CRUD
 * Registered users can access CRUD for individual Orders
 */


router.post('/', mustBeLoggedIn, createDoc('Order', true));

router.get('/', mustBeAdmin, getDocsAndSend('Order'));

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('Order'));

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('Order'))

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('Order'))

/**
 *  These CRUD operations should be accessible by both admin and individual users
 *  TODO : Need to check that the user is the individual user with that order
 */
