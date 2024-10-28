'use strict';

const sql = require('mssql');
const config = require('../config/sqlserver_config');

async  function  getDayOffData() {
    try {
      let  pool = await  sql.connect(config);
      let  TimeKeeping_data = await  pool.request().query(`SELECT Employee.firstname+' '+Employee.lastname AS fullname, Employee.position, Employee_dayoff.*
          FROM Employee, Employee_dayoff 
          WHERE Employee.employee_id = Employee_dayoff.employee_id`);
      return  TimeKeeping_data.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


  //       "employee_id": 1,
  //       "start_date": "2024-01-05T00:00:00.000Z",
  //       "end_date": "2024-01-07T00:00:00.000Z",
  //       "reason": "Medical Leave",
  //       "status": "Approved"
async  function  addDayOff(DayOff) {
    try {
      let  pool = await  sql.connect(config);
      await  pool.request()
      .input('employee_id', sql.Int, DayOff.employee_id)
      .input('start_date', sql.Date, DayOff.start_date)
      .input('end_date', sql.Date, DayOff.end_date)
      .input('reason', sql.VarChar, DayOff.reason)
      .input('status', sql.VarChar, DayOff.status)
      .query('INSERT INTO Employee_dayoff (employee_id, start_date, end_date, reason, status) VALUES (@employee_id, @start_date, @end_date, @reason, @status)');
      // return  json({ message: 'addDayOff successful'});
    }
    catch (err) {
      console.log(err);
    }
}
async  function  updateDayOff(DayOff) {
  try {
    let  pool = await  sql.connect(config);
    await  pool.request()
    .input('dayoff_id', sql.Int, DayOff.dayoff_id)
    .input('employee_id', sql.Int, DayOff.employee_id)
    .input('start_date', sql.Date, DayOff.start_date)
    .input('end_date', sql.Date, DayOff.end_date)
    .input('reason', sql.VarChar, DayOff.reason)
    .input('status', sql.VarChar, DayOff.status)
    .query('UPDATE Employee_dayoff SET employee_id = @employee_id, start_date = @start_date, end_date = @end_date, reason = @reason, status = @status WHERE dayoff_id = @dayoff_id');
    // return  json({ message: 'addDayOff successful'});
  }
  catch (err) {
    console.log(err);
  }
}
async  function  deleteDayOff(DayOff) {
  try {
    let  pool = await  sql.connect(config);
    await  pool.request()
    .input('dayoff_id', sql.Int, DayOff.dayoff_id)
    .query('DELETE FROM Employee_dayoff WHERE dayoff_id = @dayoff_id');
    // return  json({ message: 'addDayOff successful'});
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
    getDayOffData:  getDayOffData,
    addDayOff:  addDayOff,
    updateDayOff: updateDayOff,
    deleteDayOff: deleteDayOff
  }