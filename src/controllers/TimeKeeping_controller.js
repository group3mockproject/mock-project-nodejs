'use strict';

const sql = require('mssql');
const config = require('../config/sqlserver_config');

async  function  getTimeKeeping() {
    try {
      let  pool = await  sql.connect(config);
      let  TimeKeeping_data = await  pool.request().query("SELECT * from TimeKeeping");
      return  TimeKeeping_data.recordsets;
    }
    catch (error) {
      console.log(error);
    }
}
async  function  getTimeKeepingbyDate(date) {
    try {
      let  pool = await  sql.connect(config);
      let  product = await  pool.request()
      .input('input_parameter', sql.Date, date)
      .query("SELECT * from TimeKeeping where wdate = @input_parameter");
      return  product.recordsets;
    }
    catch (error) {
      console.log(error);
    }
}

module.exports = {
    getTimeKeeping:  getTimeKeeping,
    getTimeKeepingbyDate:  getTimeKeepingbyDate,
  }