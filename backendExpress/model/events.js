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
   * @param {'ASC'|'DESC'|false} [isOrderTitle      =false] 
   * @param {'ASC'|'DESC'|false} [isOrderDate       =false] 
   * @param {'ASC'|'DESC'|false} [isOrderRegiDate   =false] 
   * @param {'ASC'|'DESC'|false} [isOrderCreatedDate=false] 
   * @param {boolean} [isAvailable=true] true: registration aft today, else include all events not yet taken place
   * @param {boolean} [inclHidden=false] true: show all, else dont show hidden
   */
  static async findBy (title='', afterDate=Sequelize.DataTypes.NOW, beforeDate, organiserIDs=[], 
    isOrderTitle=false, isOrderDate=false, isOrderRegiDate=false, 
    isOrderCreatedDate=false, isAvailable=true, inclHidden=false) {
    // where 

    const titleJson = {title: {
      [Op.like]: `%${title}%`
    }};

    const beforeJson = (beforeDate == undefined)? {} : {[Op.lte]: beforeDate};
    const dateTimeJson = {
      startDateTime: Object.assign(
        beforeJson, {[Op.gte]: afterDate}
    )};
    
    // prevent some incorrect typing thing occur, untested
    const organiserID = (organiserIDs instanceof Number)? [organiserIDs] : organiserIDs;
    const eventOrgs = (organiserID == [] || !(organiserID instanceof Array))? organiserID : [];
    const orgJson = {eventOrgID: eventOrgs};

    const availableJson = (isAvailable)? {registrationEndsAt: {
      [Op.gte]: Sequelize.DataTypes.NOW,
    }} : {};

    const visibleJson = (inclHidden)? {} : {isVisible: true};

    const whereJson = Object.assign({}, titleJson, dateTimeJson, orgJson, availableJson, visibleJson);

    // ordering
    const orderByTitle       = (!isOrderTitle)?       [] : ['title', isOrderTitle];
    const orderByDate        = (!isOrderDate)?        [] : ['startDateTime', isOrderDate];
    const orderByRegiDate    = (!isOrderRegiDate)?    [] : ['registrationEndsAt', isOrderRegiDate];
    const orderByCreatedDate = (!isOrderCreatedDate)? [] : ['createdAt', isOrderCreatedDate];
    const orderingArr = [orderByTitle, orderByDate, orderByRegiDate, orderByCreatedDate];

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
