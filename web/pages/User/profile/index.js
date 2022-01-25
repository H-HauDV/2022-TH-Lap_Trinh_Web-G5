import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios, { post } from "axios";
import UserLayout from "../../../layouts/UserLayout";
import UserInfoForm from "../../../components/form/user/changeInfor";
import UserPasswordForm from "../../../components/form/user/changePassword";
import Loading from "../../../components/loading";
import * as moment from "moment";

import {
  List,
  Card,
  Image,
  Tooltip,
  Table,
  Row,
  Col,
  Input,
  Tag,
  Avatar,
  Button,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignature,
  faMale,
  faMapMarker,
  faCalendarTimes,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const { Meta } = Card;

function UserProfilePage() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const router = useRouter();
  const [activeCardTabKey, setActiveCardTabKey] = useState("updateInformation");
  const CardTabListForm = [
    {
      key: "updateInformation",
      tab: "Update Information",
    },
    {
      key: "changePassword",
      tab: "Change Password",
    },
  ];
  const CardContentListForm = {
    updateInformation: (
      <>
        {loading ? (
          <Loading loading={loading} overlay={loading}></Loading>
        ) : (
          <UserInfoForm userInfor={user}></UserInfoForm>
        )}
      </>
    ),
    changePassword: (
      <>
        <UserPasswordForm></UserPasswordForm>
      </>
    ),
  };
  const onCardTabChange = (key) => {
    setActiveCardTabKey(key);
  };
  const checkAuth = () => {};
  const fetchData = async () => {
    var userFromLocal = JSON.parse(localStorage.getItem("user-info"));
    // // console.log(userFromLocal.id)
    var apiLinkForUserInfo =
      "http://127.0.0.1:8000/api/user/getInfoByID/advanced/" + userFromLocal.id;
    axios.get(apiLinkForUserInfo).then((response) => {
      const inforTemp = response.data;
      setUser(inforTemp);
    });
  };
  function formatDate(date) {
    const OldDate = new Date(date);
    const NewDate =
      OldDate.getDate() +
      "-" +
      parseInt(OldDate.getMonth() + 1) +
      "-" +
      OldDate.getFullYear();
    return NewDate;
  }
  // function handleUploadButtonClick() {
  //   document.getElementById("uploadAvatar").click();
  // }
  // function handleUploadAvatar(e) {
  //   const url = "/api/files";

  //   const formData = new FormData();
  //   formData.append("file", e.target);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   var temp=document.getElementById("uploadAvatar").value;
  //   console.log(e.target);
  //   return post(url, formData, config);
  // }
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      console.log(image);
    }
  };
  const uploadToServer = async (event) => {
    var data = new FormData();
    data.append("file", image);
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/file", config);
    console.log(response);
  };

  useEffect(() => {
    checkAuth();
    fetchData();

    setLoading(false);
  }, []);

  if (loading) {
    return <Loading loading={loading} overlay={loading}></Loading>;
  }
  return (
    <div id="MainContent">
      <UserLayout>
        <Row className="" style={{ marginTop: 20 }}>
          <Col span={24}>
            <Row>
              <Card
                hoverable
                className="user-profile-card"
                bordered={false}
                style={{ width: "100%" }}
                cover={<img alt="example" src="/user_default/cover.jpg" />}
              >
                <Meta
                  //onClick={handleUploadButtonClick}
                  avatar={
                    <Avatar
                      src={
                        user.avatar == null
                          ? "https://joeschmoe.io/api/v1/random"
                          : user.avatar
                      }
                    />
                  }
                  title={user.name == null ? "Not updated" : user.name}
                  description={user.email}
                />
              </Card>
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Col span={8}>
                <Card
                  className="card-head"
                  title="General-info"
                  bordered={false}
                  style={{ backgroundColor: "#343a40", borderRadius: 5 }}
                >
                  <List className="user-info-list">
                    <List.Item style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faSignature} />
                      &nbsp;Full name:{user.fullName}
                    </List.Item>
                    <List.Item style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faMale} />
                      &nbsp;Gender:{user.gender}
                    </List.Item>
                    <List.Item style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faMapMarker} />
                      &nbsp;Location:{user.address}
                    </List.Item>
                    <List.Item style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faCalendarTimes} />
                      &nbsp;Join date:
                      <br />
                      {formatDate(user.created_at)}
                    </List.Item>
                    <List.Item style={{ color: "white" }}>
                      <FontAwesomeIcon icon={faFileAlt} />
                      &nbsp;Description:
                      {user.selfDescription}
                    </List.Item>
                  </List>
                </Card>
              </Col>
              <Col span={15} offset={1}>
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#343a40",
                    color: "white",
                  }}
                  className="user-profile-form"
                  bordered={false}
                  tabList={CardTabListForm}
                  activeTabKey={activeCardTabKey}
                  tabBarExtraContent={<a href="#"></a>}
                  onTabChange={(key) => {
                    onCardTabChange(key);
                  }}
                >
                  {CardContentListForm[activeCardTabKey]}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </UserLayout>
    </div>
  );
}

export default UserProfilePage;
