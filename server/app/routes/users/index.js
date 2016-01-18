'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
  createDoc,
  getDocsAndSend,
  getDocAndSendIfOwnerOrAdmin,
  getDocAndUpdateIfOwnerOrAdmin,
  getDocAndDeleteIfOwnerOrAdmin
} from '../../../helpers/routesCrud';


router.post('/', createDoc('User'));

router.get('/', mustBeAdmin, getDocsAndSend);

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('User'));

router.get('/:id/products', mustBeLoggedIn, getDocsAndSend('Product','user'))

router.get('/:id/reviews', mustBeLoggedIn, getDocsAndSend('Review','user'))

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('User'));

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('User'));
