'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// R - Retrieve all users
router.get('/', userController.getAll);

// C - Create new user
router.post('/', userController.create);

// R - Retrieve user with id
router.get('/:id', userController.getByID);

// U - Update user with id
router.put('/:id', userController.update);

// D - Delete user with id
router.delete('/:id', userController.delete);

module.exports = router;