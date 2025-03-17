'use strict';

const { User, UserType, PreserveUser } = require('./init-controller');
const mail = require('../mail');

//   sequelize = db.sequelize,
//   Sequelize = db.Sequelize;
// const initModels = require('../models/init-models');
// const models = initModels(sequelize);
// const User = models.user;
// const UserType = models.usertype;
// const PreserveUser = models.preserveuser;

// --- C ---
// Create and Save a new User
exports.create = async (user, options) => {
  const u = await models.User.create(user, options);
  // console.log(u);
  return u;
};
// --- R ---
// Retrieve all Users from the database.
exports.findAll = async (options) => {
  const u = await User.findAll(options);
  // console.log(u);
  return u;
};
// Find a single User with an id
exports.findByID = async (id, options) => {
  const u = await User.findByID(id, options);
  // console.log(u);
  return u;
};
exports.findByEmail = async (email) => {
  const u =  User.findByEmail(email);
  // console.log(u);
  return u;
};
// --- U ---
exports.update = async (values, options={}) => {
  const u = await User.update(values, options);
  // console.log(u);
  return u;
};
// Update a User by the id in the request
exports.updateByID = async (id, values) => {
  return await User.updateByID(id, values);
};
// --- D ---
// Delete a User with the specified id in the request
exports.delete = async (options) => {
  const u = await User.delete(options);
  // console.log(u);
  return u;
};
exports.deleteByID = async (id) => {
  const u = await User.deleteByID(options);
  // console.log(u);
  return u;
};

// userType
exports.findUserTypeOf = async (id) => {
  return await User.findUserTypeOf(id, UserType);
};

// --------------
// login & signups
exports.matchingPass = async (id, passString) => {
  return await User.matchingPass(id, passString);
};
exports.matchingDomain = async (id, domain) => {
  return await User.matchingDomain(id, domain);
};
exports.emailIsUsed = async (email) => {
  return await User.emailIsUsed(email);
};

exports.signUpChecks = async (req, res, next) => {
  const body = req.body;
  const form = {
    email: body.email,
    password1: body.password1,
    password2: body.password2,
  };
   User.signUpChecks(body.email, body.password1, body.password2)
   .then(() => {
    req.session.form = form;
    res.send({error: false});
    // res.redirect('/signup/verify');

    const otp = mail.createOTP();
    const text = `To verify your email address and complete sign up, enter the verification code on the application. \n\nVerification Code: ${otp}`;
    const subject = "[UoSM SEGP] Verify to Sign Up to CampusNavigation";
    const html = `<b> ${otp}<b>`
    mail.storeOTP(otp);
    mail.sendMail(body.email, subject, text, '');

   }).catch((err) => {
    console.log('Error occured - ', err);
    res.send({error: err.message});
    // this.signupSetup(res, form, err.message);
  });
}
exports.verifyOTP = async (req, res, next) => {
  const match = mail.verifyOTP(req.body.code);
  if (match) {
    await this.signUp(req, res, next);
  } else {
    res.send({error: 'Code does not match'});
    // this.verifySetup(req, res, next, 'Code does not match');
  };
};
exports.signUp = async (req, res, next) => {
  const session = req.session.form;
  const form = {
    email: session.email,
    password1: session.password1,
    password2: session.password2,
  };

  User.signUp(session.email, session.password1, session.password2)
  .then((id) => {
    // currently, next() shows CANNOT POST /signup
    // so for now res.redirect directly
    req.session.destroy();
    mail.clearOTP();
    res.send({error: false});
    // res.redirect('/index');
    return id;
  })
  .catch((err) => {
    console.log('Error occured - ', err);
    res.send({error: err.message});
    // this.verifySetup(req, res, next, err.message);
  });
};
exports.logIn = async (req, res, next) => {
  const body = req.body;
  const form = {
    email:    body.email, 
    password: body.password
  };

  User.logIn(body.email, body.password)
  .then((id) => {
    // move to main page
    res.send({error: false, userID: id});
    return id;
  }).catch((err) => {
    console.log('Error occured - ', err);
    res.send({error: err.message});
    // this.loginSetup(res, form, err.message);
  });
};
exports.logOut = async () => {
  process.env.USER = -1;
  return -1;
};

// view
exports.signupSetup = (res, form={}, err="") => {
  // cannot be here if logged in
  console.log('SignupSetup')
  if (!User.isLoggedOut()) {
      console.log('User already logged in.');
      res.redirect('/index');
      return;
  };
  // res.render('./signup', {
  //     title: 'SignUp',
  //     signupError: err,
  //     form: form,
  // });
};
exports.loginSetup = (res, form={}, err="") => {
  console.log("LoginSetup");
  // cannot be here if logged in
  if (!User.isLoggedOut()) {
      console.log('User already logged in.');
      res.redirect('/index');
      return;
  };
  // res.render('./login', {
  //     title: 'Login',
  //     loginError: err,
  //     form: form
  // });
};
exports.indexSetup = (res, err="") => {
  // send them back if not logged
  if (User.isLoggedOut()) {
      console.log('Not logged in, default as guest.')
      // res.render('./index', {
      //   title: 'Main',
      //   userType: 'Guest',
      //   loggedIn: false,
      // });
      return;
  };

  console.log('User logged in with id', process.env.USER);
  
  this.findUserTypeOf(process.env.USER).then((data) => {
    // res.render('./index', {
    //   title: 'Main',
    //   userType: data,
    //   loggedIn: true,
    // });
  });
};
exports.verifySetup = (req, res, next, err="") => {
  console.log('VerifySetup');
  if (!User.isLoggedOut) {
    console.log('User is already logged in.');
    res.redirect('/index');
    return;
  };
  if (req.session.form == undefined) {
    res.redirect('/signup');
    return;
  };
  // res.render('./verify', {
  //   title: 'Verify',
  //   form: req.session.form,
  //   error: err,
  // });
  const form = req.session.form;
  req.session.form = form;
};

// Utils
function isNull(param) {
  return param === null;
};