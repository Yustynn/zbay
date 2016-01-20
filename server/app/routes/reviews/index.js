'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
	createDoc,
	getDocsAndSend,
	getDocAndSend,
	getDocAndUpdateIfOwnerOrAdmin,
	getDocAndDeleteIfOwnerOrAdmin }
from '../../../helpers/routesCrud';

router.post('/', mustBeLoggedIn, createDoc('Review', true))

router.get('/', getDocsAndSend('Review'))

router.get('/:id', getDocAndSend('Review',['product','user']))

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('Review'))

router.delete('/:id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('Review'))
