/**
 * CategoryControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi')

module.exports = {
  
    getAllCategory: async function (req, res) {
        try {
           const category = await Category.find()
           return res.status(201).json({
           message: "Lấy category thành công",
           category
        })
        } catch (error) {
           return res.status(400).json({
              message: error.message
           });
        }
     },
  
     getOneCategory: async function (req, res) {
        try {
           const category = await Category.findOne({id: req.params.id})
           return res.status(201).json({
           message: "Lấy category thành công",
           category
        })
        } catch (error) {
           return res.status(400).json({
              message: error.message
           });
        }
     },
  
     removeCategory: async function (req, res) {
        try {
           const category = await Category.destroyOne({_id: req.params.id});
           return res.status(201).json({
           message: "Xóa category thành công",
           category
        })
        } catch (error) {
           return res.status(400).json({
              message: error.message
           });
        }
     },
  
     updateCategory: async function (req, res) {
        try {
           const category = await Category.updateOne({id: req.params.id}, req.body)
           return res.status(201).json({
           message: "Cập nhật category thành công",
           category
        })
        } catch (error) {
           return res.status(400).json({
              message: error.message
           });
        }
     },
  
      create: async function (req, res) {
          const schemaCategory = Joi.object({
              name: Joi.string().required().messages({
                "string.empty" : "Trường name không được để trống",
                "any.required" : "Trường name là bắt buộc",
              })
           })
           try {
              //const validateData = await schemaCategory.validateAsync(req.body, {abortEarly:false})
              const {error} = schemaCategory.validate(req.body)
              if (error) {
                 return res.status(400).json({
                     message: error.details[0].message,
                 });
             }
              const result = await Category.create(req.body)
              return res.json({
                 message: "Thêm category thành công",
                 result
              })
           } catch (error) {
              return res.status(400).json({
                 message: error.message
             });
           }
      },
      
};

