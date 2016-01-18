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


router.post('/', mustBeLoggedIn, createDoc('OrderItem', true));

router.get('/', mustBeAdmin, getDocsAndSend('OrderItem'));

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('OrderItem'));

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('OrderItem'))

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('OrderItem'))

/**
 *  These CRUD operations should be accessible by both admin and individual users
 *  TODO : Need to check that the user is the individual user with that order
 */
