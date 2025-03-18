'use strict';

const { Event, EventOrg } = require('./init-controller');


// --- C ---
/**
 * 
 * @param {JSON} req.body.obj
 * @param {JSON} req.body.options (optional)
 * @returns res.json (error?, message, data)
 */
exports.create = async (req, res) => {
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  }
  if (!keyExists(req.body, 'obj')) {
    emptyError(res, 'req.body.obj');
    return;
  }
  const result = await Event.create(req.body.obj, req.body.options);
  res.json({
    error: false,
    message: `Event created successfully`,
    data: result
  });
  return result;
};

// --- R ---
/**
 * 
 * @param {JSON} req.body.options (optional)
 * @returns res.json (error?, message, data)
 */
exports.findAll = async (req, res) => {
  const options = (keyExists(req, 'body'))? req.body.options : undefined;

  const result = await Event.findAll(options);
  res.json({
    error: false,
    message: `Select events query ran successfully`,
    data: result
  });
  return result;
};
/**
 * 
 * @param {INTEGER} req.params.id
 * @param {JSON} req.body.options (optional)
 * @returns res.json (error?, message, data)
 */
exports.findByID = async (req, res) => {
  if (!keyExists(req, 'params')) {
    emptyError(res, 'req.params');
    return;
  }
  if (!keyExists(req.params, 'id')) {
    emptyError(res, 'req.params.id');
    return;
  };
  const options = (keyExists(req, 'body'))? req.body.options : {};

  const result = await Event.findByID(req.params.id, options);
  res.json({
    error: false,
    message: `Event selection with ID ran successfully`,
    data: result
  });
  return result;
};
/**
 * 
 * within req.body:
 * @param {String} [title=''] optional, WHERE `title` LIKE `{ val }`
 * @param {Date}   afterDate  optional
 * @param {Date}   beforeDate optional
 * @param {Array}  [organiserIDs=[]] optional
 * @param {'ASC'|'DESC'|false} [isOrderTitle      =false] optional
 * @param {'ASC'|'DESC'|false} [isOrderDate       =false] optional
 * @param {'ASC'|'DESC'|false} [isOrderRegiDate   =false] optional
 * @param {'ASC'|'DESC'|false} [isOrderCreatedDate=false] optional
 * @param {boolean} [isAvailable=true] true: registration aft today, else include all events not yet taken place
 * @param {boolean} [inclHidden=false] true: show all, else dont show hidden
 * @returns 
 */
exports.findBy = async (req, res) => {
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  };
  const title = req.body.title;
  const afterDate = req.body.afterDate; // change format
  const beforeDate = req.body.beforeDate; // change format
  const organiserIDs = req.body.organiserIDs;
  const isOrderTitle = req.body.isOrderTitle;
  const isOrderDate = req.body.isOrderDate;
  const isOrderRegiDate = req.body.isOrderRegiDate;
  const isOrderCreatedDate = req.body.isOrderCreatedDate;
  const isAvailable = req.body.isAvailable;
  const inclHidden = req.body.inclHidden;
  
  const result = await Event.findBy(
    title, afterDate, beforeDate, organiserIDs, 
    isOrderTitle, isOrderDate, isOrderRegiDate, isOrderCreatedDate, isAvailable, inclHidden
  );
  res.json({
    error: false,
    message: `Events filter applied successfully`,
    data: result
  });
  return result;
};

// --- U ---
/**
 * 
 * @param {JSON} req.body.values
 * @param {JSON} req.body.options (optional)
 * @returns res.json (error?, message, data)
 */
exports.update = async (req, res) => {
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  };
  
  const result = await Event.update(req.body.values, req.body.options);
  res.json({
    error: false,
    message: `Update query ran successfully`,
    data: result
  });
  return result;
};
/**
 * Update by the id in the request
 * @param {INTEGER} req.params.id
 * @returns res.json (error?, message, data)
 */
exports.updateByID = async (req, res) => {
  if (!keyExists(req, 'params')) {
    emptyError(res, 'req.params');
    return;
  }
  if (!keyExists(req.params, 'id')) {
    emptyError(res, 'req.params.id');
    return;
  }
  const result = await Event.updateByID(req.params.id);
  res.json({
    error: false,
    message: `Event ${req.params.id} updated.`,
    data: result
  });
  return result;
};
// --- D ---
/**
 * 
 * @param {JSON} req.body.options (optional)
 * @returns res.json (error?, message, data)
 */
exports.delete = async (req, res) => {
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  }
  const result = await Event.delete(req.body.options);
  res.json({
    error: false,
    message: `Event deletion query ran successfully`,
    data: result
  });
  return result;
};
/**
 * delete by id
 * @param {JSON} req.params.id
 * @returns res.json (error?, message, data)
 */
exports.deleteByID = async (req, res) => {
  if (!keyExists(req, 'params')) {
    emptyError(res, 'req.params');
    return;
  }
  if (!keyExists(req.params, 'id')) {
    emptyError(res, 'req.params.id');
    return;
  }

  const result = await Event.deleteByID(id);
  res.json({
    error: false,
    message: `User ${req.params.id} deleted.`,
    data: result
  })
  return result;
};


// event orgs
exports.findAllOrg = async (req, res) => {
  const options = (keyExists(req, 'body'))? req.body.options : undefined;

  const result = await EventOrg.findAll(options);
  res.json({
    error: false,
    message: `Select events organisers query ran successfully`,
    data: result
  });
  return result;
};


function keyExists(json, key) {
  return !(json[key] == undefined || json[key] == null);
}
function emptyError(res, key='key given') {
  res.status(400).json({error: true, message: `${key} is empty`});
}