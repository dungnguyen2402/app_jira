//import React from 'react'
import { Button, Form, Input, notification } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { useAddSignupMutation } from "./signup.service";

const config = {
  apiKey: "AIzaSyB0aRPYe7oPFSgByTAjsWAugg5hcGyFjcE",
  authDomain: "app-jira.firebaseapp.com",
};

firebase.initializeApp(config);

const Signup = () => {
  const navigate = useNavigate();

  const [addSignup] = useAddSignupMutation();

  const onFinish = (values: any) => {
    addSignup(values);
    notification.success({
      message: "Signup success",
      description: "Bạn đăng đã kí tài khoản thành công!Vui lòng đăng nhập",
    });
    navigate("/signin");
  };

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        console.log(userCred);
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
              htmlType="submit"
            >
              Signup
            </Button>
          </Form.Item>
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
            onClick={loginWithGoogle}
          >
            Login với google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Signup;
