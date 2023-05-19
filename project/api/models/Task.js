/**
 * Task.js
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

    title: {
      type: "string",
    },

    description: {
      type: "string",
    },

    status: {
      type: "string",
    },

    assignees: {
      type: "string",
    },

    reporter: {
      type: "string",
    },

    priority: {
      type: "string",
    },

    originalEstimate: {
      type: "string",
    },

    startDate: {
      type: "string",
    },

    duedate: {
      type: "string",
    },

    position: {
      type: "number",
    },
  },
  //   afterCreate: (data) => {
  //     console.log(data);
  //   },
};
