/**
 * SearchControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  searchTaskTitle: async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const regex = new RegExp(searchTerm, "i");

    try {
      const searchResults = await Task.find({ title: regex });
      res.send(searchResults);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
