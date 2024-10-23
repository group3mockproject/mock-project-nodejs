'use strict';

const router = require('express').Router();

const Db = require('../controllers/DayOff_controller');

router.route('/').get((request, response) => {
    Db.getDayOffData().then((data) => {
      response.json(data[0]);
    })
  })

router.route('/add').post((request, response) => {
  let DayOff = { ...request.body }
    Db.addDayOff(DayOff).then((data) => {
     return response.status(201).json({ data, message: 'Add DayOff data successful'});
    })
  })
router.route('/update').put((request, response) => {
  let DayOff = { ...request.body }
    Db.updateDayOff(DayOff).then((data) => {
      return response.status(201).json({ data, message: 'Update DayOff data successful'});
    })
    })
router.route('/delete').delete((request, response) => {
  let DayOff = {...request.body }
    Db.deleteDayOff(DayOff).then((data) => {
      return response.status(201).json( { data, message: 'Delete DayOff data successful'});
    })
  })
module.exports = router;
