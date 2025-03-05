'use strict';

const conn = require('../db.config');

// to create user
class User {
    constructor(user={}) {
        this.userID = user.userID;
        this.uniID = user.uniID;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.salt = user.salt;
        this.userTypeID = user.userTypeID;
    };

    // compensate for the weird constructor, can be modified later
    create (userID=null, uniID, name, email, password, salt, userTypeID) {
        this.userID = userID;
        this.uniID = uniID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.userTypeID = userTypeID;
        return this;
    };
}

// CRUD example from 
// https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
// prepared statement to avoid sql injection
User.create = (newUser, result) => {
    conn.query('INSERT INTO `user` SET ?', newUser, (err, res) => {
        if (err) {
            console.log(`error: ${err}`);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.getByID = (id, result) => {
    conn.query("SELECT * FROM user WHERE userID = ? ", id, (err, res) => {
        if(err) {
            console.log(`Error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.getAll = (result) => {
    conn.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log(`error: ${err}`);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.update = (id, user, result) => {
    console.log([user.uniID, user.email, user.password, user.salt, user.userTypeID, id]);
    conn.query("UPDATE user SET uniID=?, email=?, password=?, salt=?, userTypeID=? WHERE userID = ?", [user.uniID, user.email, user.password, user.salt, user.userTypeID, id], (err, res) => {
        if (err) {
            console.log(`error: ${err}`);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.delete = (id, result) => {
    conn.query("DELETE FROM user WHERE userID = ?", [id], (err,res) => {
        if (err) {
            console.log(`error: ${err}`);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}


module.exports = User;