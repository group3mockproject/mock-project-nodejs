'use strict';

const router = require('express').Router();


const {getMaintenanceHistory} = require('../controllers/ManageMaintenanceCosts_Controller');

router.get('/', getMaintenanceHistory);

module.exports = router;