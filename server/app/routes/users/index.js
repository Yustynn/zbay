'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
  createDoc,
  getAllDocsAndSend,
  getDocAndSendIfOwnerOrAdmin,
  getDocAndUpdateIfOwnerOrAdmin,
  getDocAndDeleteIfOwnerOrAdmin
} from '../../../helpers/routesCrud';


router.post('/', createDoc('User'));

router.get('/', mustBeAdmin, getAllDocsAndSend);

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('User'));

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('User'));

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('User'));
