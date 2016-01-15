'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin } from '../../../helpers/routesPermissions'
import { getDocAndDelete, getDocAndUpdate, getDocsAndSend, createDoc }
from '../../../helpers/routesCrud';

router.get('/', getDocsAndSend('Category'));

router.post('/', mustBeAdmin, createDoc('Category'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Category'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Category'));
