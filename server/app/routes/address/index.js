'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import { getDocAndDelete, getDocAndUpdate, getDocsAndSend, createDoc, getDocAndSend }
from '../../../helpers/routesCrud';

router.get('/', getDocsAndSend('Address'));

router.get('/:id', getDocAndSend('Address'));

router.post('/', mustBeLoggedIn, createDoc('Address'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Address'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Address'));
