'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
	createDoc,
	getAllDocsAndSend,
	getDocAndSend,
	getDocAndUpdateIfOwnerOrAdmin,
	getDocAndDeleteIfOwnerOrAdmin }
from '../../../helpers/routesCrud';

router.post('/', mustBeLoggedIn, createDoc('Review', true))

router.get('/', getAllDocsAndSend('Review'))

router.get('/:id', getDocAndSend('Review'))

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('Review'))

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('Review'))
