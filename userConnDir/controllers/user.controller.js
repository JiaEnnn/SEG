'use strict';

const User = require('../models/user.model');

// controller function
exports.create = (req, res) => {
    const newUser = new User(req.body);

    // handle null error, 400 Bad Request
    if (nullError(req,res)) return;
    
    User.create(newUser, (err, user) => {
        if (err) res.send(err);
        res.json({
            error:false, 
            message:`User created successfully at ${Date.now()}`, 
            data:user
        });
        console.log(res.json());
    });
};

exports.getAll = (req, res) => {
    User.getAll((err, user) => {
        
        if (err) res.send(err);
        console.log(`res: ${JSON.stringify(user)}`);
        res.send(user);
    });
};

exports.getByID = (req, res) => {
    User.getByID(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json(user);
        console.log(`res: ${JSON.stringify(user)}`);
    });
};


// current problem: log not clear enough
exports.update = (req,res) => {
    const newUser = new User(req.body);

    // handle null error, 400 Bad Request
    if (nullError(req, res)) return;

    User.update(req.params.id, newUser, (err, user) => {
        if (err) res.send(err);
        res.json({
            error:false,
            message: `User ${id} successfully updated at ${Date.now()}`
        });
        console.log(`res: ${JSON.stringify(user)}`);
    });
};

// current problem: doesn't show "user doesn't exist"
exports.delete = (req, res) => {
    User.delete(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json({
            error:false,
            message: `User successfully deleted`,
            data: user
        });
        console.log(res.json());
    });
};
// return true when null error occurs
function nullError (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error:true, 
            message:'Please provide all required field'
        });
        return true;
    };
    return false;
};