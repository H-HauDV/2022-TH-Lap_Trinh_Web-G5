import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row } from "antd";
import { useRouter } from "next/router";
import Loading from "../../../loading";

const { Option } = Select;
function userInfoForm(props) {
  const [userForm, setUserForm] = useState([]);
  const [loading, setLoading] = useState(true)

  const onFinish = (values) => {
    console.log('Success:', values);
    const url = "http://127.0.0.1:8000/api/user/setInfoByRequest/changeable/";

    let options = {
      method: "PUT",
      headers: { 
        'Content-type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(values),
      url
    };
    axios(options)
      .then(response => {
        // console.log("K_____ res :- ", response);
      })
      .catch(error => {
        //console.log("K_____ error :- ", error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const setData = () => {
    
    // while(props.userInfor.id==null){
    //   setLoading(true)
    // }
    // console.log("userInfor:");
    // console.log(props.userInfor);
    setUserForm(props.userInfor);
    // console.log("userForm:");
    // console.log(userForm);
    
  };

  useEffect(() => {
    setData();
    if(userForm.id!=null)setLoading(false)

  }, [props, userForm]);
  if (loading) {
    return <Loading loading={loading} overlay={loading}></Loading>;
  }
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
      <Form.Item label="" hidden={true} name="id" initialValue={userForm.id}>
        <Input />
      </Form.Item>
      <Form.Item label="Username" name="username" initialValue={userForm.name}>
        <Input />
      </Form.Item>
      <Form.Item
        label="FullName"
        name="fullname"
        initialValue={userForm.fullName}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" initialValue={userForm.email}>
        <Input disabled={true}/>
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select
          placeholder="Select a gender"
          allowClear
          defaultValue={userForm.gender}
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        initialValue={userForm.address}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={userForm.selfDescription}
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
export default userInfoForm;
