'use strict';

const crypto = require('crypto');
const zlib = require('node:zlib');

// general url route of user
const path = '/ex/user';
const host = `http://${process.env.URL}:${process.env.PORT}`;
const url = `${host}${path}`;

exports.getByID = async (id) => {
    const url = `${host}${path}/${id}`;

    const options = {
        hostname: host,
        path: `${path}/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    };

    try {
        // wait for fetched response
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const json = await res.json();
        if (isEmpty(json)) {
            console.log(`User ${id} do not exist.`);
        } else {
            console.log(`user system: User ${id} retrieved successfully.`);
        };
        return json;
    } catch (err) {
        console.log(`error: ${err}`);
        console.log(`user system: failed to get user`);
    };
};

exports.getAll = async () => {
    const options = {
        hostname: host,
        path: path,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    };

    try {
        // wait for fetched response
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const json = await res.json();
        console.log(`user system: get all rows from user successfully`);
        return json;
    } catch (err) {
        console.log(`error: ${err}`);
        console.log(`user system: failed to get all rows`);
    };
};

// test insertion, expects user password to be hashed
exports.create = async (user) => {
    try {
        if (isNull(user) || isUndefined(user)) {
            throw new Error('user system: User given is either null or undefined');
        };

        // 
        const salt = saltGen();
        user.salt = zip(salt);
        const password = hashing(user.password,salt);
        user.password = zip(password);

        const options = {
            hostname: host,
            path: path,
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        // wait for fetched response
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const json = await res.json();
        console.log(JSON.stringify(user));
        console.log(`user system: user created successfully`);
        return json;

    } catch (err) {
        console.log(err);
        console.log(`user system: User creation failed.`);
    }
};

// currently not working
exports.update = async (id, user) => {
    try {
        if (isNull(user) || isUndefined(user)) {
            throw new Error('user system: User given is either null or undefined');
        };

        user.salt = Buffer.from(byteToBin(saltGen()));
        user.password = Buffer.from(byteToBin(hashing(user.password,user.salt)));
    
        const options = {
            hostname: host,
            path: path,
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        // wait for fetched response
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const json = await res.json();
        console.log(JSON.stringify(user));
        console.log(`user system: user ${id} update successfully`);
        return json;

    } catch (err) {
        console.log(err);
        console.log(`user system: User update failed.`);
    }
};

exports.delete = async (id) => {
    const url = `${host}${path}/${id}`;

    const options = {
        hostname: host,
        path: `${path}/${id}`,
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    };
    try {

        // wait for fetched response
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const json = await res.json();
        console.log(`user system: user ${id} deleted uccessfully`);
        return json;

    } catch (err) {
        console.log(err);
        console.log(`user system: User deletion failed.`);
    }
};

exports.isMatching = async (id, passString) => {
    const user = await this.getByID(id);
    try {
        // not matching if no mentioned user exist
        if (isEmpty(user)) {
            throw new Error(`User ${id} do not exist.`);
        }

        // retrieved and unzip pass and salt
        const password = unzip(user[0].password);
        const salt =  unzip(user[0].salt);

        // hash the given password to compare
        const givenPass = hashing(passString, salt);

        return (Buffer.compare(givenPass, password)) === 0;
    } catch (err) {
        console.log(err);
        return false;
    };
};

// used PBKDF2 here
// https://www.delftstack.com/howto/mysql/store-password-in-database-mysql/
const byteCnt = 128;

function saltGen () {
    return crypto.randomBytes(byteCnt);
};

function hashing (password, salt, iterations = 128) {
    return crypto.pbkdf2Sync(password, salt, iterations, byteCnt, 'sha256');
};

function byteToBin(bytes) {
    return bytes.toString('hex');
}

// zip to send to database, unzip when retrieved
function zip(obj) {
    return zlib.gzipSync(JSON.stringify(obj))
    .toString('base64');
}
function unzip(obj) {
    return Buffer.from(
        JSON.parse(
            zlib.unzipSync(
                Buffer.from(obj, 'base64')
            )
        )
    );
}

// const salt = saltGen();
// console.log(((byteToBin(salt))));
// const pass = byteToBin(hashing('abc12345', salt));

// const User = require('./user.model');
// const obj = {name : "hi", pass : "world"};
// const user1 = new User().create('',2363231,"QY","psxz1g24","soton.ac.uk","abc12345","mshasd",1);
// console.log(user1);
// console.log(`JSON: ${JSON.stringify(user1)}`);

// user1.password = pass;
// user1.salt = byteToBin(salt);
// console.log(user1);


function isNull(param) {
    return param === null;
};

function isUndefined(param) {
    return param === undefined;
};

function isEmpty(obj) {
    return Object.keys(obj).length == 0;
};