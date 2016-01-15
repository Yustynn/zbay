'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin } from '../../../helpers/routesPermissions'
import { getDocAndDelete, getDocAndUpdate, getAllDocsAndSend, createDoc }
from '../../../helpers/routesCrud';

router.get('/', getAllDocsAndSend('Category'));

router.get('/:id', getAllDocsAndSend('Category'));

router.post('/', mustBeAdmin, createDoc('Category'));

router.put('/:id', mustBeAdmin, getDocAndUpdate('Category'));

router.delete('/:id', mustBeAdmin, getDocAndDelete('Category'));
