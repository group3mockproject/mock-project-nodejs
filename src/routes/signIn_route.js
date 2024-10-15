'use strict';

const router = require('express').Router();


const { postSignin} = require('../controllers/signIn_controller');


router.post('/', postSignin);

module.exports = router;