'use strict';

const router = require('express').Router();


const {testAPI, postLogin} = require('../controllers/login_controller');

router.get('/', testAPI);

router.post('/login', postLogin);

module.exports = router;