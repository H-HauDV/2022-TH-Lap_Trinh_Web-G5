
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserLayout from '../../../layouts/UserLayout'

import { List, Card, Image, Tooltip, Table, Row, Col, Rate, Tag , Avatar } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faUsers, faTags, faSpinner, faUserPlus, faEye, faBookmark, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
const { Meta } = Card;

function UserProfilePage() {
  const [isLoading, setLoading] = useState(false); 
  const [user, setUser] = useState(false); 
  const router = useRouter()
  const checkAuth=()=>{
  }
  const fetchData = async () => {
    var userFromLocal=JSON.parse(localStorage.getItem('user-info'))
    console.log(userFromLocal.id)
    var apiLinkForUserInfo="http://127.0.0.1:8000/api/user/getInfoByID/advanced/"+userFromLocal.id
    axios
    .get(apiLinkForUserInfo)
    .then((response) => {
      console.log(response.data);
      setUser(response.data)
    })
  }
  useEffect(() => {
    checkAuth()
    fetchData()
  }, [])
  return (
    <div id="MainContent">
      <UserLayout>
        <Row className="" style={{ marginTop: 20 }}>
            <Col span={24} >
              <Row>
                <Card
                   hoverable
                   className="user-profile-card"
                   bordered={false}
                   style={{ width: "100%" }}
                  cover={<img   alt="example" src="/user_default/cover.jpg" />}
                 >
                  <Meta
                       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={user.name==null ? "Not updated":user.name}
                      description={user.email}
                     />
                 </Card>
              </Row>
              <Row>
                <Col span={8}>
                  <Card className="card-head" title="General-info" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
                    <List
                      itemLayout="horizontal"
                      dataSource={comments}
                      renderItem={comment => (
                        <List.Item>
                          <List.Item.Meta
                            className="text-white"
                            //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<a style={{ color: "#fff"}}href="https://ant.design">hh</a>}
                            description={<p style={{ color: "#fff"}}>kk</p>}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col span={15}>

                </Col>
              </Row>
            </Col>
        </Row>
      </UserLayout>
    </div>
    
  );
}

export default UserProfilePage;
