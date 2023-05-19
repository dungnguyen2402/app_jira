import { useState } from "react";
import OtpInput from "react-otp-input";

type Props = {};

const UserOtp = (props: Props) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="otp-wrapper">
      <h2>Xác thực với mã OTP</h2>
      <h4>Vui lòng nhập OTP</h4>
      <div className="otp-container">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props, index) => (
            <input {...props} className="otp-input" key={index} />
          )}
        />
      </div>
      <button className="otp-button">Xác nhận</button>
    </div>
  );
};

export default UserOtp;
