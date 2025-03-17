'use strict';

// const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const controller = require('../controller/eventController');


/*
// create token
const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
        expiresIn: '1h', // Token expiration time
  });
*/
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorisation');

//   if (!token) {
//     return res.status(401).json({ error: 'Authentication token missing' });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Token is invalid'});
//     }
//     req.user = user;
//     next(); // Continue to the protected route
//   });
// };

// R - Retrieve all
router.get('/', controller.findAll);

// C - Create new
router.post('/', controller.create);

// R - Retrieve with id
router.get('/:id', controller.findByID);

// U - Update with id
router.put('/', controller.update);
router.put('/:id', controller.updateByID);

// D - Delete with id
router.delete('/', controller.delete);
router.delete('/:id', controller.deleteByID);

module.exports = router;