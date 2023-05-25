//import React from 'react'
import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import axios from "axios";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    const resultValidate = await form.validateFields();

    if (!resultValidate.error) {
      axios
        .post("http://localhost:1337/send-otp", {
          email: form.getFieldValue("email"),
        })
        .then(() => {
          notification.success({
            message: "Signup success",
            description: "Send otp successfully",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const onHandleGoogle = async () => {
    try {
      await axios.get("http://localhost/1337/auth/google/callback");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
    axios
      .post("http://localhost:1337/signup", values)
      .then(() => {
        notification.success({
          message: "Signup success",
          description: "",
        });
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div>
          <img
            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            alt="Person Iscon"
            className="signup-person-icon"
          />
        </div>

        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 1000,
            maxHeight: 700,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            required={false}
          >
            <Input
              style={{ width: "100%", height: "36px" }}
              placeholder="Enter your name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            required={false}
          >
            <Input
              style={{ width: "100%", height: "36px" }}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            required={false}
          >
            <Input.Password placeholder="password" style={{ height: "36px" }} />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Button
              style={{
                width: "100%",
                height: "44px",
                marginTop: "20px",
                backgroundColor: "green",
                fontSize: "18px",
              }}
              type="primary"
              onClick={handleSendOtp}
            >
              Xác thực với OTP
            </Button>
          </Form.Item>
          <h4>Vui lòng nhập OTP</h4>
          <Form.Item className="otp-container" name="otp">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props, index) => (
                <input {...props} className="otp-input" key={index} />
              )}
            />
          </Form.Item>
          <Button htmlType="submit" className="otp-button">
            Xác nhận
          </Button>

          <hr />
          {/* <div><StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /></div> */}
          <p style={{ textAlign: "center" }}>
            Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
          </p>
        </Form>
        <a href="http://localhost:1337/login/google">
          <button
            style={{
              padding: "14px 70px",
              width: "100%",
              cursor: "pointer",
              float: "right",
              color: "white",
              backgroundColor: "red",
              border: "none",
              fontSize: "14px",
            }}
            onClick={onHandleGoogle}
          >
            Login với google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Signup;
