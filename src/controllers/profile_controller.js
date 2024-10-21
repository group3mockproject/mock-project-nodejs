'use strict';


const sql = require('mssql');
const config = require('../config/sqlserver_config');



const updateProfile = async (req, res) => {
    try {
        const {resident_id, apartment_id,fullname,date_of_birth,email,phone,SSN,password } = req.body;
        
        const firstname = fullname.split(' ').slice(0, -1).join(' ');
        const lastname = fullname.split(' ').slice(-1).join(' ');
        
        // Kết nối tới SQL Server
        const pool = await sql.connect(config);

        console.log(firstname,lastname);
        await pool.request()
                        .input('resident_id', sql.Int, resident_id)
                        .input('apartment_id', sql.Int, apartment_id)
                        .input('firstname', sql.VarChar, firstname)
                        .input('lastname', sql.VarChar, lastname)
                        .input('date_of_birth', sql.Date, date_of_birth)
                        .input('email', sql.VarChar, email)
                        .input('phone', sql.VarChar, phone)
                        .input('SSN', sql.VarChar, SSN)
                        .input('password', sql.VarChar, password)
                        .query(`UPDATE Resident SET apartment_id = @apartment_id, firstname = @firstname, lastname= @lastname, date_of_birth = @date_of_birth,
                             email =@email, phone =@phone, SSN=@SSN, status ='Active', password =@password, delflag=0 WHERE resident_id = @resident_id`);
        return res.json({ message: 'Update Profile successful'});
    } catch (e) {
        console.log('Error logging in:', e.message);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {updateProfile}