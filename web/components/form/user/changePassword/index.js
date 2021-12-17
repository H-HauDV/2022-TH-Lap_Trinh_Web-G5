import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Option } from "antd";
import { useRouter } from "next/router";
function userPasswordForm() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {

  }, []);
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="user-form"
    >
      <Form.Item
        label="New Password"
        name="password1"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="password2"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default userPasswordForm;
