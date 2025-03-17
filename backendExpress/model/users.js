const Sequelize = require('sequelize');
const Model = require('./MyModel');
const crypto = require('crypto');
const zlib = require('node:zlib');

class User extends Model {
  static _iterations = 128;
  static _byteCnt = 128;

  // getter
  get iterations() {
    return this._iterations;
  };
  get byteCnt() {
    return this._byteCnt;
  };

  // using the MyModel create, but add hashing before that
  /** @inheritdoc */
  static async create(user, options) {
    //zipping and hashing 
    const salt = this.saltGen();
    user.salt = this.zip(salt);
    const password = this.hashing(user.password,salt);
    user.password = this.zip(password);

    return await super.create(user, options);
  };

  /**
   * Return userType information from
   * user with userID 'id'
   * @param {INTEGER} id 
   * @returns userType (String from enum)
   */
  static async findUserTypeOf(id) {
    // const innerJoin = join(true, userTypeModel);
    const result = await this.findByID(id);
    if (isNull(result)) {
      throw new Error (`User ${id} do not exist.`);
    };
    return result.userType;

    // const userTypeID = result['UserType.userTypeID'];
    // const name = result['UserType.name'];

    // return {userTypeID: userTypeID, name: name};
  };

  // PBKDF2
  /**
  * Generate randomBytes of length _byteCnt
  * @returns Buffer of randomBytes
  */
  static saltGen () {
    return crypto.randomBytes(this._byteCnt);
  };
  /**
  * Uses password in Buffer or String and a salt 
  * to generate Buffer encrypted with PBKDF2
  * @param {crypto.BinaryLike} password
  * @param {crypto.BinaryLike} salt
  */
  static hashing (password, salt) {
    return crypto.pbkdf2Sync(password,salt,this._iterations,this._byteCnt,'sha256');
  };

  // Zip and unzip
  /**
  * zip to send to database, unzip when retrieved
  * @param {Object} obj
  * @returns String in base64
  */
  static zip (obj) {
    return zlib.gzipSync(JSON.stringify(obj))
    .toString('base64');
  };
  static unzip (obj) {
    return Buffer.from(
      JSON.parse(
        zlib.unzipSync(
          Buffer.from(obj, 'base64')
        )
      )
    );
  };

  // password matcher
  /**
  * retrieves user from database and  
  * compare the hashed password with new password
  * @param {INTEGER} id
  * @param {String} passString
  * @returns Boolean value
  */
  static async matchingPass(id, passString) {
    const user = await this.findByID(id);
    if (isNull (user)) {
      throw new Error (`User ${id} do not exist.`);
    };

    
    return this.hashAndComparePass(passString, user.salt, user.password);
  };
  /**
  * Helper function for matchingPass, 
  * works with unzipping given password,  
  * comparing the hashed new password and original password
  * @param {String} passString 
  * @param {String} saltZip
  * @param {String} passwordZip
  * @returns Boolean value
  */
  static hashAndComparePass(passString, saltZip, passwordZip) {
    // retrieved and unzip pass and salt
    const password = this.unzip(passwordZip);
    const salt = this.unzip(saltZip);

    // hash the given password to compare
    const givenPass = this.hashing(passString, salt);
    const value = Buffer.compare(givenPass, password);
    return value === 0;
  };
  // domain matcher
  /**
  * retrieves user from database, then 
  * check if email address ends in given domain
  * @param {INTEGER} id
  * @param {String} domain 
  * or:
  * @param {String} email
  * @param {String} domain
  * @returns Boolean value
  */
  static async matchingDomain(id, domain) {
    const user = await this.findByID(id);
    if (isNull (user)) {
      throw new Error (`User ${id} do not exist.`);
    };
    if (!isString(domain)) {
      throw new Error (`domain should be a string, received ${typeof domain}`);
    }

    return await this.matchingDomain(user.email, domain);
  };
  static matchingDomain(email, domain) {
    return email.endsWith(domain);
  };
  // find user with this email address
  /**
  * check if user with this email address exists
  * @param {String} email 
  * @returns Boolean value
  */
  static async emailIsUsed(email) {
    const users = await this.findByEmail(email);
    return users.length > 0;
  };
  /**
  * error thrower before user creation
  * @param {String} email
  * @param {String} pass1
  * @param {String} pass2  
  * @returns nothing
  */
  static async signUpChecks(email, pass1, pass2) {
    const emailUsed = await this.emailIsUsed(email);
    
    // catch this to display?
    if (!User.matchingDomain(email, '@soton.ac.uk')) {
      throw new Error ('This is not a UoS email address.');
    }
    if (emailUsed) {
      throw new Error ('User with this email already exist.');
    };
    // for password matching, documentListener might work better
    // but I don't know how to do that here
    if (pass1 != pass2) {
      throw new Error ('Password does not match');
    };
  };

  // sign up function
  /**
  * sign up function
  * @param {String} email
  * @param {String} pass1
  * @param {String} pass2  
  * @returns UserID of new user
  */
  static async signUp(email, pass1, pass2) {
    await this.signUpChecks(email, pass1, pass2);

    const userType = (this.isStudent(email))? 'student' : 'staff';
    const result = await User.create({
      name: null,
      email: email,
      password: pass1,
      salt: '',
      userType: userType,
    });
    process.env.USER = result.userID;
    return result.userID;
  };
  /**
  * verifies user with email and password given
  * @param {String} email
  * @param {String} passStr 
  * @returns userID
  */
  static async logIn(email, passStr) {
    const user = await this.findByEmail(email);

    // maybe catch this and display it?
    if (user.length === 0) {
      throw new Error ('No user with this email exist.'); 
    }

    const id = user[0].userID;
    const correctPass = await this.matchingPass(id, passStr);

    // same with this error
    if (!correctPass) {
      throw new Error ('Incorrect password.');
    }
    process.env.USER = id;
    return id;
  };
  /**
  * Incomplete, currently uses process.env
  */
  static async logout() {
    const id = process.env.USER;
    process.env.USER = -1;
    return id;
  };
  static isLoggedOut() {
    return process.env.USER == -1;
  };
  static isStudent(email) {
    // student: [anyChars] [1 Digit] [1 Char] [two Digits] @soton.ac.uk
    // others: username @ devdomain.soton.ac.uk
    const regex = /([a-zA-Z]+\d[a-zA-Z]\d\d@soton.ac.uk)$/;
    return regex.test(email);
  };
};

// class User extends Model {
//   static _iterations = 128;
//   static _byteCnt = 128;
//   static raw = true;

//   // getter
//   get iterations() {
//     return this._iterations;
//   }
//   get byteCnt() {
//     return this._byteCnt;
//   }
  
//   // CRUD
//   /**
//    * @param {JSON} user
//    * @param {JSON} options
//    */
//   static async create(user, options={}) {
//     //zipping and hashing 
//     const salt = this.saltGen();
//     user.salt = this.zip(salt);
//     const password = this.hashing(user.password,salt);
//     user.password = this.zip(password);

//     options.raw = this.raw;
//     return await super.create(user, options);
//   };
//   /**
//    * @param {JSON} options
//    */
//   static async findAll(options={}) {
//     options.raw = this.raw;
//     return await super.findAll(options);
//   };
//   /**
//    * @param {INTEGER} id
//    * @param {JSON} options
//    */
//   static async findByID(id, options={}) {
//     options.raw = this.raw;
//     return await super.findByPk(id, options);
//   };
//    /**
//    * Search for multiple instances with an email address
//    * @param {String} email
//    */
//   static async findByEmail(email) {
//     const options = {where: {email: email}};
//     return await this.findAll(options);
//   };
//    /**
//    * @param {JSON} values
//    */
//   static async update(values, options={}) {
//     options.raw = this.raw;
//     return await super.update(values, options);
//   };
//    /**
//    * Update multiple instances by id 
//    * @param {INTEGER} id
//    * @param {JSON} values
//    */
//   static async updateByID(id, values) {
//     const options = {where:{userID: id}};
//     return await this.update(values, options);
//   };
//   /**
//   * Delete multiple instances
//   * @param {JSON} options
//   * @returns Promise The number of destroyed rows
//   */
//   static async delete(options={}) {
//     options.raw = this.raw;
//     return await super.destroy(options);
//   };
//   /**
//   * Delete by id
//   * @param {INTEGER} id
//   * @returns Promise The number of destroyed rows
//   */
//   static async deleteByID(id) {
//     const options = {where: {userID: id}};
//     return await this.delete(options);
//   };

//   /**
//    * Return userType information from
//    * user with userID 'id'
//    * @param {INTEGER} id 
//    * @returns userType (String from enum)
//    */
//   static async findUserTypeOf(id) {
//     // const innerJoin = join(true, userTypeModel);
//     const result = await this.findByID(id);
//     if (isNull(result)) {
//       throw new Error (`User ${id} do not exist.`);
//     };
//     return result.userType;

//     // const userTypeID = result['UserType.userTypeID'];
//     // const name = result['UserType.name'];

//     // return {userTypeID: userTypeID, name: name};
//   };

//   // PBKDF2
//   /**
//   * Generate randomBytes of length _byteCnt
//   * @returns Buffer of randomBytes
//   */
//   static saltGen () {
//     return crypto.randomBytes(this._byteCnt);
//   };
//   /**
//   * Uses password in Buffer or String and a salt 
//   * to generate Buffer encrypted with PBKDF2
//   * @param {crypto.BinaryLike} password
//   * @param {crypto.BinaryLike} salt
//   */
//   static hashing (password, salt) {
//     return crypto.pbkdf2Sync(password,salt,this._iterations,this._byteCnt,'sha256');
//   };

//   // Zip and unzip
//   /**
//   * zip to send to database, unzip when retrieved
//   * @param {Object} obj
//   * @returns String in base64
//   */
//   static zip (obj) {
//     return zlib.gzipSync(JSON.stringify(obj))
//     .toString('base64');
//   };
//   static unzip (obj) {
//     return Buffer.from(
//       JSON.parse(
//         zlib.unzipSync(
//           Buffer.from(obj, 'base64')
//         )
//       )
//     );
//   };

//   // password matcher
//   /**
//   * retrieves user from database and  
//   * compare the hashed password with new password
//   * @param {INTEGER} id
//   * @param {String} passString
//   * @returns Boolean value
//   */
//   static async matchingPass(id, passString) {
//     const user = await this.findByID(id);
//     if (isNull (user)) {
//       throw new Error (`User ${id} do not exist.`);
//     };

    
//     return this.hashAndComparePass(passString, user.salt, user.password);
//   };
//   /**
//   * Helper function for matchingPass, 
//   * works with unzipping given password,  
//   * comparing the hashed new password and original password
//   * @param {String} passString 
//   * @param {String} saltZip
//   * @param {String} passwordZip
//   * @returns Boolean value
//   */
//   static hashAndComparePass(passString, saltZip, passwordZip) {
//     // retrieved and unzip pass and salt
//     const password = this.unzip(passwordZip);
//     const salt = this.unzip(saltZip);

//     // hash the given password to compare
//     const givenPass = this.hashing(passString, salt);
//     const value = Buffer.compare(givenPass, password);
//     return value === 0;
//   };
//   // domain matcher
//   /**
//   * retrieves user from database, then 
//   * check if email address ends in given domain
//   * @param {INTEGER} id
//   * @param {String} domain 
//   * or:
//   * @param {String} email
//   * @param {String} domain
//   * @returns Boolean value
//   */
//   static async matchingDomain(id, domain) {
//     const user = await this.findByID(id);
//     if (isNull (user)) {
//       throw new Error (`User ${id} do not exist.`);
//     };
//     if (!isString(domain)) {
//       throw new Error (`domain should be a string, received ${typeof domain}`);
//     }

//     return await this.matchingDomain(user.email, domain);
//   };
//   static matchingDomain(email, domain) {
//     return email.endsWith(domain);
//   };
//   // find user with this email address
//   /**
//   * check if user with this email address exists
//   * @param {String} email 
//   * @returns Boolean value
//   */
//   static async emailIsUsed(email) {
//     const users = await this.findByEmail(email);
//     return users.length > 0;
//   };
//   /**
//   * error thrower before user creation
//   * @param {String} email
//   * @param {String} pass1
//   * @param {String} pass2  
//   * @returns nothing
//   */
//   static async signUpChecks(email, pass1, pass2) {
//     const emailUsed = await this.emailIsUsed(email);
    
//     // catch this to display?
//     if (!User.matchingDomain(email, '@soton.ac.uk')) {
//       throw new Error ('This is not a UoS email address.');
//     }
//     if (emailUsed) {
//       throw new Error ('User with this email already exist.');
//     };
//     // for password matching, documentListener might work better
//     // but I don't know how to do that here
//     if (pass1 != pass2) {
//       throw new Error ('Password does not match');
//     };
//   };

//   // sign up function
//   /**
//   * sign up function
//   * @param {String} email
//   * @param {String} pass1
//   * @param {String} pass2  
//   * @returns UserID of new user
//   */
//   static async signUp(email, pass1, pass2) {
//     await this.signUpChecks(email, pass1, pass2);

//     const userType = (this.isStudent(email))? 'student' : 'staff';
//     const result = await User.create({
//       name: null,
//       email: email,
//       password: pass1,
//       salt: '',
//       userType: userType,
//     });
//     process.env.USER = result.userID;
//     return result.userID;
//   };
//   /**
//   * verifies user with email and password given
//   * @param {String} email
//   * @param {String} passStr 
//   * @returns userID
//   */
//   static async logIn(email, passStr) {
//     const user = await this.findByEmail(email);

//     // maybe catch this and display it?
//     if (user.length === 0) {
//       throw new Error ('No user with this email exist.'); 
//     }

//     const id = user[0].userID;
//     const correctPass = await this.matchingPass(id, passStr);

//     // same with this error
//     if (!correctPass) {
//       throw new Error ('Incorrect password.');
//     }
//     process.env.USER = id;
//     return id;
//   };
//   /**
//   * Incomplete, currently uses process.env
//   */
//   static async logout() {
//     const id = process.env.USER;
//     process.env.USER = -1;
//     return id;
//   };
//   static isLoggedOut() {
//     return process.env.USER == -1;
//   };
//   static isStudent(email) {
//     // student: [anyChars] [1 Digit] [1 Char] [two Digits] @soton.ac.uk
//     // others: username @ devdomain.soton.ac.uk
//     const regex = /([a-zA-Z]+\d[a-zA-Z]\d\d@soton.ac.uk)$/;
//     return regex.test(email);
//   };
// };
User.initialise = (sequelize, DataTypes) => {
  User.init({
    userID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userType: {
      type: DataTypes.ENUM('student','staff','admin'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};

// Utils
function isNull(param) {
  return param === null;
};
function isUndefined(param) {
  return param === undefined;
};
function isEmpty(obj) {
  return Object.keys(obj).length == 0;
};
function isString(obj) {
  return (typeof obj === 'string') || (obj instanceof String);
};

/**
 * 
 * @param {boolean} isInner 
 * @param {Model} model 
 * @param {JSON} options 
 * @returns JSON
 */
const join = (isInner=true, model, options={}) => {
  return [{
    model: model,
    where: options,
    required: isInner,
  }];
};

module.exports = function(sequelize, DataTypes) {
  User.initialise(sequelize, DataTypes);
  return User;
};