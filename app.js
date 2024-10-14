'use strict';


const path = require('path');
const express = require('express');
const cors = require('cors');

const login = require('./src/routes/login_route');
const ManageMaintenanceCosts = require('./src/routes/ManageMaintenanceCosts_Route');
const PaymentList = require('./src/routes/PaymentList_Route');

const app = express();
app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/public`))


app.use('/', login);
app.use('/ManageMaintenanceCosts', ManageMaintenanceCosts);
// app.use('/', PaymentList )

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });