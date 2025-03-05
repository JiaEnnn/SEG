'use strict';

const express = require('express');
const userRoutes = require('./routes/user.routes');

// access environment variables
require('dotenv').config();

// express app and port
const app = express();
const port = process.env.PORT;

// middleware to parse json and from form-urlencoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("This is the root route");
});

// use as middleware
app.use('/ex/user', userRoutes);

// listen for reqs
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// some links:
// https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
// https://stackoverflow.com/questions/61922303/how-to-switch-from-using-mysql-createconnection-to-mysql-createpool
// conn.end();


// utils?
function queryPromise(sql, values=[]) {
    return new Promise((resolve, reject) => {
        conn.query(
            sql, 
            values, 
            (err, res) => (err)? reject(err) : resolve(res)
        )
    });
}

function promise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Other things to do before completion of the promise

        // The fulfillment value of the promise
        resolve();
      }, 200);
    });
  }


  // const userSystem = require('./user.system');

  // the codes used to test userSystem
  // promise()
  // .then(() => userSystem.isMatching(17,"s0t0nD4lt"))
  // .then((bool) => console.log(`pass is ${bool}`));

  // const User = require('./user.model');
  // promise()
  // .then(() => new User().create('',10000000,"root","root@soton.ac.uk","s0t0nD4lt","",3))
  // .then((user1) => userSystem.create(user1))
  // .then(() => userSystem.getAll());