// /**
//  * TaskControllerController
//  *
//  * @description :: Server-side actions for handling incoming requests.
//  * @help        :: See https://sailsjs.com/docs/concepts/actions
//  */

// const Joi = require('joi')

module.exports = {
  getAllTask: async function (req, res) {
    try {
      const tasks = await Task.find(
        req.query.q ? { title: { like: `%${req.query.q}%` } } : {}
      );
      return res.status(201).json(tasks);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

//      getOneTask: async function (req, res) {
//         try {
//            const task = await Task.findOne({id: req.params.id})
//            return res.status(201).json({
//            message: "Lấy task thành công",
//            task
//         })
//         } catch (error) {
//            return res.status(400).json({
//               message: error.message
//            });
//         }
//      },

//      removeTask: async function (req, res) {
//         try {
//            const task = await Task.destroyOne({_id: req.params.id});
//            return res.status(201).json({
//            message: "Xóa task thành công",
//            task
//         })
//         } catch (error) {
//            return res.status(400).json({
//               message: error.message
//            });
//         }
//      },

//      updateTask: async function (req, res) {
//         try {
//            const task = await Task.updateOne({id: req.params.id}, req.body)
//            return res.status(201).json({
//            message: "Cập nhật task thành công",
//            task
//         })
//         } catch (error) {
//            return res.status(400).json({
//               message: error.message
//            });
//         }
//      },

//     create: async function(req, res) {
//         const schemaTask = Joi.object({
//             name: Joi.required().messages({
//                 "string.empty" : "Trường name không được để trống",
//                 "any.required" : "Trường name là bắt buộc",
//             }),
//             title: Joi.string().required().messages({
//                 "string.empty" : "Trường title không được để trống",
//                 "any.required" : "Trường title là bắt buộc",
//             }),
//             description: Joi.string().required().messages({
//                 "string.empty" : "Trường description không được để trống",
//                 "any.required" : "Trường description là bắt buộc",
//             }),
//             status: Joi.string().required().messages({
//                 "string.empty" : "Trường status không được để trống",
//                 "any.required" : "Trường status là bắt buộc",
//             }),
//             assignees: Joi.string().required().messages({
//                 "string.empty" : "Trường assignees không được để trống",
//                 "any.required" : "Trường assignees là bắt buộc",
//             }),
//             priority: Joi.string().required().messages({
//                 "string.empty" : "Trường priority không được để trống",
//                 "any.required" : "Trường priority là bắt buộc",
//             }),
//             originalEstimate: Joi.string().required().messages({
//                 "string.empty" : "Thời gian dự kiến không được để trống",
//                 "any.required" : "Thời gian dự kiến là bắt buộc",
//             }),
//             startDate: Joi.string().required().messages({
//                 "string.empty" : "Trường startDate không được để trống",
//                 "any.required" : "Trường startDate là bắt buộc",
//             }),
//             duedate: Joi.string().required().messages({
//                 "string.empty" : "Trường duedate không được để trống",
//                 "any.required" : "Trường duedate là bắt buộc",
//             }),
//         });
//         try {
//             const {error} = schemaTask.validate(req.body)
//             if (error) {
//                return res.status(400).json({
//                    message: error.details[0].message,
//                });
//            }
//             const result = await Task.create(req.body)
//             return res.json({
//                message: "Thêm task thành công",
//                result
//             })
//          } catch (error) {
//             return res.status(400).json({
//                 message: error.message
//             });
//          }
//     }

// };
