import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";

type Props = {
  email: string;
};

const UserOtp = ({ email }: Props) => {
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);

  console.log(email);

  useEffect(() => {
    axios
      .post("http://localhost:1337/otp", { email })
      .then((response) => {
        console.log(response); // Dữ liệu trả về từ API
        // Xử lý logic tiếp theo sau khi gửi OTP thành công
      })
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  }, [email]);

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
    setOtpValid(isOTPValid(otp));
  };

  const handleOtpSubmit = () => {
    if (otpValid) {
      console.log("Mã OTP hợp lệ");
      // Thực hiện các hành động tiếp theo sau khi xác thực thành công
    } else {
      console.log("Mã OTP đã hết hạn hoặc không hợp lệ");
      // Xử lý lỗi OTP không hợp lệ
    }
  };

  const isOTPValid = (otp: string) => {
    const createdTime = new Date(); // Lấy thời gian tạo OTP
    const currentTime = new Date();
    const expirationTime = new Date(createdTime.getTime() + 5 * 60 * 1000); // Thời gian hết hạn sau 5 phút

    return otp.length === 6 && currentTime <= expirationTime;
  };

  return (
    <div className="otp-wrapper">
      <h2>Xác thực với mã OTP</h2>
      <h4>Vui lòng nhập OTP</h4>
      <div className="otp-container">
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props, index) => (
            <input {...props} className="otp-input" key={index} />
          )}
        />
      </div>
      <button className="otp-button" onClick={handleOtpSubmit}>
        Xác nhận
      </button>
    </div>
  );
};

export default UserOtp;
