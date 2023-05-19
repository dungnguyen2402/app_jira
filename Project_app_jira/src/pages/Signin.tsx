//import React from 'react'
import { Button, Form, Input, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useAddSigninMutation } from "./Signin.service";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [addSignin] = useAddSigninMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await addSignin(values);
      const token = response.data.accessToken;

      localStorage.setItem("token", token);
      //location.replace("/");
      navigate("/");

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Login successful",
        });
      } else {
        // Hiển thị thông báo lỗi
        notification.error({
          message: response.error.data.message,
        });
        console.log(response);
      }
    } catch (error) {
      notification.success({
        message: "Error",
      });
      console.log("error", error.message);
    }

    //navigate("/")
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <img
          src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
          alt="Person Iscon"
          className="signup-person-icon"
        />

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 900,
            maxHeight: 700,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
              prefix={<MailOutlined />}
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
              htmlType="submit"
            >
              Signup
            </Button>
          </Form.Item>
          <hr />
          <p style={{ textAlign: "center" }}>
            Bạn mới biết đến jira? <a href="/signup">Đăng ký</a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
