const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Model = require('./MyModel');

class Event extends Model {
  /**
   *  a function to capture all in checkbox
   * 
   * function param size: Mega
   * @param {String} [title=''] WHERE `title` LIKE `{ val }`
   * @param {Date}   afterDate 
   * @param {Date}   beforeDate 
   * @param {Array}  [organiserIDs=[]]
   * @param {'ASC'|'DESC'|false} [isOrderTitle      =false ] 
   * @param {'ASC'|'DESC'|false} [isOrderDate       ='DESC'] 
   * @param {'ASC'|'DESC'|false} [isOrderRegiDate   =false ] 
   * @param {'ASC'|'DESC'|false} [isOrderCreatedDate=false ] 
   * @param {boolean} [isAvailable=true] true: registration aft today, else include all events
   * @param {boolean} [inclHidden=false] true: show all, else dont show hidden
   * @param {Integer} userID
   */
  static async findBy (title='', afterDate, beforeDate, organiserIDs=[], 
    isOrderTitle=false, isOrderDate=false, isOrderRegiDate=false, 
    isOrderCreatedDate=false, isAvailable=true, inclHidden=false,
    userID=undefined) {
    
    // half of the section is checking which param exists
    // and how to integrate into json
    
    // where 
    const titleJson = (title)? {title: {
      [Op.like]: `%${title}%`
    }} : undefined;

    const beforeJson = (beforeDate)? {[Op.lte]: beforeDate} : undefined;
    const afterJson = (afterDate)? {[Op.gte]: afterDate} : undefined;
    let dateTimeJson = (beforeJson || afterJson)? {
      startDateTime: Object.assign({}, 
        beforeJson, afterJson
    )} : undefined;

    // prevent some incorrect typing thing occur, untested
    // currently only takes ID, no name available
    const organiserID = (organiserIDs instanceof Number)? [organiserIDs] : undefined;
    const orgJson = (organiserID)? {eventOrgID: organiserID} : undefined;

    // this can be overwritten by startDateTime above
    const availableJson = (isAvailable)? {
      registrationEndsAt: {
        [Op.or]: {
          [Op.gte]: new Date(),
          [Op.eq]: null,
        }
      },
      startDateTime: {
        [Op.gte]: new Date(),
      }} : undefined;

    const visibleJson = (inclHidden)? {} : {isVisible: true};

    const userIDJson = (userID)? {userID: userID} : undefined;
    const whereJson = Object.assign({}, titleJson, availableJson, dateTimeJson, orgJson, visibleJson, userIDJson);

    // ordering
    const orderByTitle       = (!isOrderTitle)?       undefined : ['title', isOrderTitle];
    const orderByDate        = (!isOrderDate)?        undefined : ['startDateTime', isOrderDate];
    const orderByRegiDate    = (!isOrderRegiDate)?    undefined : ['registrationEndsAt', isOrderRegiDate];
    const orderByCreatedDate = (!isOrderCreatedDate)? undefined : ['createdAt', isOrderCreatedDate];
    const orderingArr = [];
    const temp = [orderByDate, orderByTitle, orderByRegiDate, orderByCreatedDate];
    for (let i = 0; i < temp.length; i++) {
      const o = temp[i];

      if (o) orderingArr.push(o);
    };

    return await Event.findAll({
      where: whereJson,
      order: orderingArr
    });
  };
  static async findByTitle (title) {
    const result = await Event.findAll({
      where: {
        title: title
      }
    });
    return result;
  };
};

Event.initialise = (sequelize, DataTypes) => {
  Event.init({
    eventID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userID'
      }
    },
    eventOrgID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'eventorg',
        key: 'eventOrgID'
      }
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    registrationEndsAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'events',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "eventID" },
        ]
      },
      {
        name: "userID",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
      {
        name: "eventOrgID",
        using: "BTREE",
        fields: [
          { name: "eventOrgID" },
        ]
      },
    ]
  });
};


module.exports = function(sequelize, DataTypes) {
  Event.initialise(sequelize, DataTypes);
  return Event;
};
