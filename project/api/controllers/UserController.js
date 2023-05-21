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
    const schemaUserSignup = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "Trường name không được để trống",
        "any.required": "Trường name là bắt buộc",
      }),
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
      const { name, email, password } = req.body;
      const { error } = schemaUserSignup.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }

      const userExit = await User.findOne({ email });
      if (userExit) {
        return res.status(400).json({
          message: "Email đã tồn tại",
        });
      }

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
      passport.authenticate(
        "google",
        { scope: ["profile", "email"] },
        async (err, user, info) => {
          console.log("user,", user);
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

          return res.redirect("http://localhost:5173?token=" + token);
        }
      )(req, res, next);
    } catch (error) {
      res.status(404).json({ error: "Invalid Details", error });
    }
  },

  userSendotp: async function (req, res) {
    const email = req.body.email; // Lấy giá trị email từ body của yêu cầu
    try {
      // Gửi OTP qua email
      const OTP = await sendOtpEmail.sendOTPByEmail(email);
      //console.log("OTP đã được gửi qua email:", OTP);

      const createdTime = new Date(); // Lưu thời gian tạo OTP

      if (isOTPValid(OTP, createdTime)) {
        console.log("Mã OTP hợp lệ");
        res.status(200).json({ message: "OTP sent successfully" });
      } else {
        console.log("Mã OTP đã hết hạn hoặc không hợp lệ");
        res.status(400).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      console.log("Gửi OTP qua email thất bại:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  },
};

function isOTPValid(OTP, createdTime) {
  const currentTime = new Date();
  const expirationTime = new Date(createdTime.getTime() + 5 * 60 * 1000); // Thời gian hết hạn sau 5 phút

  return currentTime <= expirationTime;
}

// Login qua google
// Lưu token phía token vào Session
// Validate token cho các api với các task
// Gửi otp (tạo otp bằng function khác math.random)
// Tgian cho otp
// Đặt biến tường minh
