'use strict';

const router = require('express').Router();


const {updateProfile} = require('../controllers/profile_controller');

router.put('/updateProfile', updateProfile);

// router.post('/update', updateProfile);

module.exports = router;