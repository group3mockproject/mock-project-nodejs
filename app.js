'use strict';


const path = require('path');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');

const login = require('./src/routes/login_route');
const signIn = require('./src/routes/signIn_route');
const userAuth = require('./src/middlewares/user_auth_middleware');
const profile = require('./src/routes/profile_route');
// const ManageMaintenanceCosts = require('./src/routes/ManageMaintenanceCosts_Route');
// const PaymentList = require('./src/routes/PaymentList_Route');

const app = express();
app.use(cors());

app.use(express.json())


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE),
    },
}))


app.use('/', login);
app.use('/signin', signIn);
app.use('/profile', profile);
app.use(userAuth)




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });