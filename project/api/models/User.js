/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: "string",
      columnName: "_id",
    },

    name: {
      type: "string",
    },

    email: {
      type: "string",
    },

    password: {
      type: "string",
    },

    create: {
      type: "number",
      defaultsTo: Date.now(),
    },

    role: {
      type: "string",
      defaultsTo: "member",
    },
  },
};
