// 'use strict';

// const sql = require('mssql');
// const config = require('../config/sqlserver_config');

// const getMaintenanceHistory = async(req, res, next) => {
//     try{
//         const pool = await sql.connect(config);
//         let data = await pool.request().query('SELECT * FROM MaintenanceHistory')
//         let data2 = await pool.request().query('SELECT * FROM Maintenance_Requests');
//         let combinedData = {
//             maintenanceHistory: data.recordset, // First table data
//             maintenanceRequests: data2.recordset  // Second table data
//         };
//         return res.json(combinedData);
//     }catch(err){
//         console.error(err);
//     }
// }



// module.exports = { getMaintenanceHistory }