'use strict';

const { Event } = require('./init-controller');


// --- C ---
// Create and Save
// exports.create = async (req, res) => {
//   if (req.body == false) {
//     res.status(400).json(`req.body is empty`);
//     return;
//   }
//   if (req.body.obj == false) {
//     req.status(400).json(`no object is given`);
//     return;
//   }
//   const newEvent = req.body.obj;
// };
exports.create = async (event, options) => {
  const u = await Event.create(event, options);
  // console.log(u);
  return u;
};
// --- R ---
// Retrieve all from the database.
exports.findAll = async (options) => {
  const u = await Event.findAll(options);
  // console.log(u);
  return u;
};
// Find a single event with an id
exports.findByID = async (id, options) => {
  const u = await Event.findByID(id, options);
  // console.log(u);
  return u;
};
exports.findByEmail = async (email) => {
  const u =  Event.findByEmail(email);
  // console.log(u);
  return u;
};
// --- U ---
exports.update = async (values, options={}) => {
  const u = await Event.update(values, options);
  // console.log(u);
  return u;
};
// Update by the id in the request
exports.updateByID = async (id, values) => {
  return await Event.updateByID(id, values);
};
// --- D ---
// Delete with the specified id in the request
exports.delete = async (options) => {
  const u = await Event.delete(options);
  // console.log(u);
  return u;
};
exports.deleteByID = async (id) => {
  const u = await Event.deleteByID(options);
  // console.log(u);
  return u;
};