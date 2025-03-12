'use strict';

require('dotenv').config();
const express = require("express");
const userController = require("./controllers/userController");
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// cookies
app.use(cookieParser());
// sessions
app.use(sessions({
  secret: process.env.SECRET,
  saveUninitialized:true,
  cookie: { maxAge: 600000 },
  resave: false
}));

// set view engine for pug
app.set('views', './user/views');
app.set('view engine', 'pug');

app.get('/signup', (req, res) => {
  userController.signupSetup(res);
});
app.post('/signup', userController.signUpChecks);
app.use('./signup', (req, res) => {
  res.redirect('/index');
});
app.get('/signup/verify', (req,res,next) => 
  userController.verifySetup(req,res,next)
);
app.use('./signup/verify', (req, res) => {
  res.redirect('/index');
});
app.post('/signup/verify', userController.verifyOTP);

app.get('/login', (req, res) => {
  userController.loginSetup(res);
});
app.post('/login', userController.logIn);
app.use('/login', (req, res) => {
  res.redirect('/index');
});

app.get('/index', (req,res) => {
  userController.indexSetup(res);
});
// no idea how to connect logout, hence post
// could cause problem later when POST is required 
// in index, but that can be solved by changing logOut(), I guess
app.post('/index', async (req, res) => {
  const _ = await userController.logOut();
  res.redirect('/login');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// useful links that helped me
// https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
// https://www.geeksforgeeks.org/create-otp-input-field-using-html-css-and-javascript/
// https://sequelize.org/docs/v7/querying/delete/
// https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/
// uuid could be used later if cookies are a thing
// and also JWT, since session is used