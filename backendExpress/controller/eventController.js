'use strict';

const { Event } = require('./init-controller');


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
  if (!keyExists(req, 'body')) {
    emptyError(res, 'req.body');
    return;
  };

  const result = await Event.findAll(req.body.options);
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
 */exports.findByID = async (req, res) => {
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

function keyExists(json, key) {
  return !(json[key] == undefined || json[key] == null);
}
function emptyError(res, key='key given') {
  res.status(400).json({error: true, message: `${key} is empty`});
}