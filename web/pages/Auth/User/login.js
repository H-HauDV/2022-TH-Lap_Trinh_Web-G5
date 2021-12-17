import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { Checkbox, Col, Button, Row, Form, Input } from "antd";
import { login } from "../../api/authenticate";
import { useRouter } from "next/router";
function UserLoginPage() {
  let login_token = null;
  const router = useRouter();
  const onFinish = async (values) => {
    console.log(values);
    let result = await fetch("http://127.0.0.1:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    router.push("/Public");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id="MainContent">
      <MainLayout>
        <Row
          className="login-section"
          style={{
            backgroundColor: "#343a40",
            borderRadius: 5,
            marginTop: 50,
            marginBottom: 50,
            padding: 20,
          }}
        >
          <Col span={24}>
            <Row>
              <Col span={24}>
                <h4 className="login-text-big">Login</h4>
              </Col>
            </Row>

            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: false }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                className="text-white"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="text-white"
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="text-white"
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 4, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default UserLoginPage;
