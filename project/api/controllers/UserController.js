/**
 * UserControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const sendOtpEmail = require("./SendEmailController");
const otpGenerator = require("otp-generator");

module.exports = {
  getCurrentUser: async function (req, res) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
  createSignup: async function (req, res) {
    console.log(req.body);
    try {
      const { name, email, password } = req.body;
      // const { error } = schemaUserSignup.validate(req.body, {
      //   abortEarly: false,
      // });
      // if (error) {
      //   const errors = error.details.map((err) => err.message);
      //   return res.status(400).json({
      //     message: errors,
      //   });
      // }

      const userExit = await User.findOne({ email });
      if (userExit) {
        return res.status(400).json({
          message: "Email đã tồn tại",
        });
      }

      const otps = await Otp.find({ email }).sort("createdAt DESC");

      if (!otps[0] || otps[0].otp !== otp) {
        return res.status(400).json({
          message: "Mã OTP không hợp lệ",
        });
      } else if (otps[0].exprienIn < Date.now()) {
        return res.status(400).json({
          message: "OTP đã hết hạn",
        });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        return res.json({
          message: "Đăng kí tk thành công!",
          user,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  createSignin: async function (req, res) {
    const { email, password } = req.body;
    const schemaUserSignin = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Trường email không được để trống",
          "any.required": "Trường email là bắt buộc",
          "string.email": "Email không hợp lệ",
        }),
      password: Joi.string().required().messages({
        "string.empty": "Trường password không được để trống",
        "any.required": "Trường password là bắt buộc",
      }),
    });
    try {
      const { error } = schemaUserSignin.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }

      // vừa mã hóa và vừa so sánh
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Sai mật khẩu",
        });
      }
      const token = jwt.sign({ userIn: user.id }, "123456", {
        expiresIn: "1d",
      });
      return res.json({
        message: "Đăng nhập thành công",
        accessToken: token,
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  createGoogle: async function (req, res, next) {
    try {
      const token = await new Promise((resolve, reject) => {
        passport.authenticate(
          "google",
          { session: false },
          async (err, user, info) => {
            if (err || !user) {
              return res.redirect("/signin");
            }
            const token = jwt.sign(
              {
                id: user.id,
                name: user.name,
                email: user.email,
              },
              "123456",
              { expiresIn: "1d" }
            );
            resolve(token);
          }
        )(req, res, next);
      });
      return res.redirect("http://localhost:5173?token=" + token);
    } catch (error) {
      res.status(404).json({ error: "Invalid Details", error });
    }
  },
};

// Login qua google
// Lưu token phía token vào Session
// Validate token cho các api với các task
// Gửi otp (tạo otp bằng function khác math.random)
// Tgian cho otp
// Đặt biến tường minh
