/**
 * SendEmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

module.exports = {
  sendOTPByEmail: async (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dungdungnguyen2402@gmail.com",
        pass: "vtipzlpjctgtfgio",
      },
    });
    const email = req.body.email;
    try {
      const userExit = await User.findOne({ email });
      if (userExit) {
        return res.status(400).json({
          message: "Email đã tồn tại",
        });
      }
      const OTP = otpGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
      });

      await Otp.create({ email, otp: OTP });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For OTP Validation",
        text: `Mã OTP của bạn là: ${OTP}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return;
        }
        console.log("Email sent:", info.response);

        return res.json({ message: "success" });
      });
    } catch (error) {
      console.log("Error:", +error.message);
    }
  },
};
