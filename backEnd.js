'use strict';

// backEnd.js === App.js, as in qyl1g22's userConn

require('dotenv').config({ path: './connectDB.env' });
const express = require("express");
const app = express();

const path = require("path");
const userController = require("./backendExpress/controller/userController");
const sessions = require('express-session');
const cookieParser = require('cookie-parser');

// api route for event
const eventRoutes = require('./backendExpress/route/event.routes');
app.use('/api/events', eventRoutes);

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions
app.use(sessions({
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
  resave: false
}));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "")));

// Routes
app.get('/signup', (req, res, next) => {
  res.sendFile(path.join(__dirname, "", "signupPage.html"));
  next();
});
app.get('/signup', (req,res) => userController.signupSetup(res));
app.post('/signup', userController.signUpChecks);

app.get('/signup/verify', (req, res, next) => {
  res.sendFile(path.join(__dirname, "", "verifyPage.html"));
  next();
});
app.get('/signup/verify', userController.verifySetup);
app.post('/signup/verify', userController.verifyOTP);

app.get('/signup/verify/email', (req, res) => {
  if (req.session == undefined || req.session.form == undefined || req.session.form.email == undefined) {
    res.status(400).json({error: 'Email in form do not exist.'});
    return;
  }
  res.json({email: req.session.form.email});
});

app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, "", "loginPage.html"));
  next();
});
app.get('/login', (req,res) => userController.loginSetup(res));
app.post('/login', userController.logIn);


app.get('/index', (req, res, next) => {
  res.sendFile(path.join(__dirname, "", "index.html")); // Change to appropriate page
  next();
});
app.get('/index', (req, res, next) => {
  userController.indexSetup(res);
});

// Logout: Destroy session and redirect
app.get('/logout', (req, res) => {
  console.log('/logout');
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    userController.logOut();
    res.redirect('/login');
  });
});
app.get('/index/id', (req, res) => {
  res.json({id: process.env.USER});
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
