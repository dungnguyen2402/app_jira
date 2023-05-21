/**
 * SendEmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

module.exports = {
  sendOTPByEmail: async (email) => {
    try {
      const OTP = otpGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
      });
      console.log("Mã OTP:", OTP);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dungdungnguyen2402@gmail.com",
          pass: "vtipzlpjctgtfgio",
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For OTP Validation",
        text: `Mã OTP của bạn là: ${OTP}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      return OTP;
    } catch (error) {
      console.log("Error:", +error);
    }
  },
};
