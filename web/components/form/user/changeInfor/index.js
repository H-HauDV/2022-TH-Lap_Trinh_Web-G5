import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row } from "antd";
import { useRouter } from "next/router";
import Loading from '../../../loading'

const { Option } = Select;
function userInfoForm({userInfor}) {
  const [userForm, setUserForm] = useState([]); 
  const [loading, setLoading] = useState(false)
  const onFinish = (values) => {
    //console.log('Success:', values);
    console.log(user)
  };
  const setData=()=>{

    console.log("userInfor:")
    console.log(userInfor)
    const userInforTemp=userInfor
    setUserForm(userInforTemp)
    console.log("user:")
    console.log(userForm)

  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };
  useEffect(() => {
    setLoading(true)
    setData()
    setLoading(false)
  }, []);
  return (
    <>
     {loading ? (
            <div className="flex flex-wrap content-center">
              <Loading loading={loading} overlay={loading} />
            </div>
          ) : (
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
          label="Username"
          name="username"
          //initialvalues={userForm.name}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="FullName"
          name="fullname"
          //initialvalues={userForm.fullName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          //initialvalues={userForm.email}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select
            placeholder="Select a gender"
            allowClear
            //initialvalues={userForm.gender}
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          //initialvalues={userForm.address}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
         // initialvalues={userForm.selfDescription} 
        >
          <Input/>
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>)}
    </>
  );
}
export default userInfoForm;
