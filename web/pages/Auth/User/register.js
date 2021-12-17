import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { Checkbox, Col, Button, Row, Form, Input } from "antd";
import { login } from "../../api/authenticate";
import { useRouter } from "next/router";

function UserRegisterPage() {
  let login_token = null;
  const [emailValidateStatus, setEmailValidateStatus] = useState("");
  const [emailHelpMessage, setEmailHelpMessage] = useState("");
  const router = useRouter();
  const onFinish = async (values) => {
    if (emailValidateStatus == "success") {
      console.log(values);
      let result = await fetch("http://127.0.0.1:8000/api/user/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      router.push("/Public");
    } else {
      console.log("false");
    }
  };
  function checkEmailExist(e) {
    var checkLink =
      "http://127.0.0.1:8000/api/user/checkEmailDuplication/" + e.target.value;
    axios
      .get(checkLink)
      .then((response) => {
        console.log(response.data);
        if (response.data == 0) {
          setEmailValidateStatus("success");
          setEmailHelpMessage("");
        } else {
          setEmailValidateStatus("error");
          setEmailHelpMessage("Email already taken");
        }
      })
      .catch((error) => {});
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id="MainContent">
      <MainLayout>
        <Row
          className="register-section"
          style={{
            backgroundColor: "#343a40",
            borderRadius: 5,
            marginTop: 50,
            marginBottom: 50,
            padding: 50,
          }}
        >
          <Col span={24}>
            <Row>
              <Col span={24}>
                <h4 className="login-text-big">Sign up</h4>
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
                validateStatus={emailValidateStatus}
                help={emailHelpMessage}
                className="text-white"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input onChange={checkEmailExist} />
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

export default UserRegisterPage;
