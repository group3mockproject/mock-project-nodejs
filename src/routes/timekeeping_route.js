'use strict';

const router = require('express').Router();


const Db = require('../controllers/TimeKeeping_controller');

router.route('/').get((request, response) => {
    Db.getTimeKeeping().then((data) => {
      response.json(data[0]);
    })
  })
  
router.route('/:date').get((request, response) => {
    Db.getTimeKeepingbyDate(request.params.date).then((data) => {
      response.json(data[0]);
    })
  })

module.exports = router;