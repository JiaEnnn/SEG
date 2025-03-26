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
  res.status(200).json({
    error: false,
    message: `Event created successfully`,
    data: result
  });
  return result;
};

// --- R ---
/**
 * 
 * @param {JSON} req.body (optional)
 * @returns res.json (error?, message, data)
 */
exports.findAll = async (req, res) => {
  const options = (keyExists(req, 'body'))? req.body : undefined;

  const result = await Event.findAll(options);
  res.status(200).json({
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
  const options = (keyExists(req, 'body'))? req.body : {};

  const result = await Event.findByID(req.params.id, options);
  res.status(200).json({
    error: false,
    message: `Event selection with ID ran successfully`,
    data: result
  });
  return result;
};
/** @inheritdoc */
exports.findBy = async (req, res) => {
  // if no body, use full default
  if (!keyExists(req, 'body')) {
    const result = await Event.findBy();
    res.status(200).json({
      error: false,
      message: `Events with default filter applied successfully`,
      data: result
    });
    return result;
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
  const userID = req.body.userID;
  
  const result = await Event.findBy(
    title, afterDate, beforeDate, organiserIDs, 
    isOrderTitle, isOrderDate, isOrderRegiDate, isOrderCreatedDate, isAvailable, inclHidden,
    userID
  );
  res.status(200).json({
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
  res.status(200).json({
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
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  };
  if (!keyExists(req, 'params')) {
    emptyError(res, 'req.params');
    return;
  }
  if (!keyExists(req.params, 'id')) {
    emptyError(res, 'req.params.id');
    return;
  }
  const result = await Event.updateByID(req.params.id, req.body);
  res.status(200).json({
    error: false,
    message: `Event ${req.params.id} updated.`,
    data: result
  });
  return result;
};
// --- D ---
/**
 * 
 * @param {JSON} req.body (optional)
 * @returns res.json (error?, message, data)
 */
exports.delete = async (req, res) => {
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  }
  const result = await Event.delete(req.body);
  res.status(200).json({
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
  res.status(200).json({
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
  res.status(200).json({
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