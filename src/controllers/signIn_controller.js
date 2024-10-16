'use strict';

const sql = require('mssql');
const config = require('../config/sqlserver_config');



const postSignin = async (req, res) => {
    try {
        const { apartment_id,firstname,lastname,date_of_birth,email,phone,SSN,password } = req.body;

        // Kết nối tới SQL Server
        const pool = await sql.connect(config);

        // Kiểm tra xem email đã tồn tại chưa
        const emailExists = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Resident WHERE email = @email'); 
        // console.log(emailExists);
        if(emailExists.recordset.length) {
            return res.status(400).json({ message: 'Email already exists!' });
        }else{
            await pool.request()
                        .input('apartment_id', sql.Int, apartment_id)
                        .input('firstname', sql.VarChar, firstname)
                        .input('lastname', sql.VarChar, lastname)
                        .input('date_of_birth', sql.Date, date_of_birth)
                        .input('email', sql.VarChar, email)
                        .input('phone', sql.VarChar, phone)
                        .input('SSN', sql.VarChar, SSN)
                        .input('password', sql.VarChar, password)
                        .query(`INSERT INTO Resident (apartment_id, firstname, lastname, date_of_birth, email, phone, SSN, status, password, delflag) VALUES (@apartment_id,
                                @firstname, @lastname, @date_of_birth, @email, @phone, @SSN, 'Active', @password, 0)`);
        }
        return res.json({ message: 'SignIn successful'});
    } catch (e) {
        console.log('Error logging in:', e.message);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {postSignin}