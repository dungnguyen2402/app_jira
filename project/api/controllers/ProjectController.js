// /**
//  * ProjectControllerController
//  *
//  * @description :: Server-side actions for handling incoming requests.
//  * @help        :: See https://sailsjs.com/docs/concepts/actions
//  */
// const Joi = require('joi');

// module.exports = {
//    getAllProject: async function (req, res) {
//       try {
//          const project = await Project.find()
//          return res.status(201).json({
//          message: "Lấy project thành công",
//          project
//       })
//       } catch (error) {
//          return res.status(400).json({
//             message: error.message
//          });
//       }
//    },

//    getOneProject: async function (req, res) {
//       try {
//          const project = await Project.findOne({id: req.params.id})
//          return res.status(201).json({
//          message: "Lấy project thành công",
//          project
//       })
//       } catch (error) {
//          return res.status(400).json({
//             message: error.message
//          });
//       }
//    },

//    removeProject: async function (req, res) {
//       try {
//          const project = await Project.destroyOne({_id: req.params.id});
//          return res.status(201).json({
//          message: "Xóa project thành công",
//          project
//       })
//       } catch (error) {
//          return res.status(400).json({
//             message: error.message
//          });
//       }
//    },

//    updateProject: async function (req, res) {
//       try {
//          const project = await Project.updateOne({id: req.params.id}, req.body)
//          return res.status(201).json({
//          message: "Cập nhật project thành công",
//          project
//       })
//       } catch (error) {
//          return res.status(400).json({
//             message: error.message
//          });
//       }
//    },

//     create: async function (req, res) {
//          try {
//             //const validateData = await schemaProject.validateAsync(req.body, {abortEarly:false})
//             //const {error} = schemaProject.validate(req.body)
//             if (error) {
//                return res.status(400).json({
//                    message: error.details[0].message,
//                });
//            }
//             const result = await Project.create(req.body)
//             return res.json({
//                message: "Thêm project thành công",
//                result
//             })
//          } catch (error) {
//             return res.status(400).json({
//                message: error.message
//            });
//          }
//     },
    

// };

