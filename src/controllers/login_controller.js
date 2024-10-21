'use strict';

const Resident = require('../models/residents');
const sql = require('mssql');
const config = require('../config/sqlserver_config');


const testAPI = async (req, res) => {
    
    const pool = await sql.connect(config);
        const result = await pool.request()
            .query('SELECT * FROM Resident ');
    return res.json({ result: result});
    // res.render('./pages/login');
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kết nối tới SQL Server
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Resident WHERE email = @email')
            
        const result2 = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Employee WHERE email = @email');
            


        // Kiểm tra nếu không tìm thấy user
        let currentUser;

        if (result.recordset.length === 0) {
            if (result2.recordset.length === 0) {
                return res.status(400).json({ message: 'Invalid email !, Please ensure that the email you entered has already been used to create an account.' });
            } else {
                currentUser = result2.recordset[0];
                if (password !== currentUser.password) {
                    return res.status(400).json({ message: 'Wrong Password !, Please ensure that you entered the correct password and try again' });
                }
                req.session.user = {
                    userAuthenticated: true,
                    employee_id: currentUser.employee_id,
                    position: currentUser.position,
                    fullname: `${currentUser.firstname} ${currentUser.lastname}`,
                    date_of_birth: currentUser.date_of_birth,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    SSN: currentUser.SSN,
                    password: currentUser.password,
                };
        
            }
        } else {
            currentUser = result.recordset[0];
            if (password !== currentUser.password) {
                return res.status(400).json({ message: 'Wrong Password !, Please ensure that you entered the correct password and try again' });
            }
            req.session.user = {
                userAuthenticated: true,
                resident_id: currentUser.resident_id,
                apartmentId: currentUser.apartment_id,
                fullname: `${currentUser.firstname} ${currentUser.lastname}`,
                date_of_birth: currentUser.date_of_birth,
                email: currentUser.email,
                phone: currentUser.phone,
                SSN: currentUser.SSN,
                password: currentUser.password,
            };
    
    }
        console.log(currentUser.password)

        return res.json({ message: 'Login successful', session: req.session.user});
    } catch (e) {
        console.log('Error logging in:', e.message);
        return res.status(500).json({ message: 'Server error' ,currentUser});
    }
};


module.exports = {testAPI, postLogin}