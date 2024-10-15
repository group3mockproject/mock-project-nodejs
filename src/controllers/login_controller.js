'use strict';


const sql = require('mssql');
const bcryptjs = require('bcryptjs');
const config = require('../config/sqlserver_config');


const renderLogin = async (req, res) => {
    // TODO: Implement logic to authenticate user
    
    res.render('./pages/login');
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kết nối tới SQL Server
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Resident WHERE email = @email');

        // Kiểm tra nếu không tìm thấy user
        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Invalid email !, Please ensure that the email you entered has already been used to create an account.' });
        }

        const currentUser = result.recordset[0];  // Lấy đối tượng người dùng từ kết quả trả về

        // Nếu mật khẩu không khớp
        if (password !== currentUser.password) {
            return res.status(400).json({ message: 'Wrong Password !, Please ensure that you entered the correct password and try again' });
        }

        return res.json({ message: 'Login successful'});
    } catch (e) {
        console.log('Error logging in:', e.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { postLogin };




module.exports = {renderLogin, postLogin}