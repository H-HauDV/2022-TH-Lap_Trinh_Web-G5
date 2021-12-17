

import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import axios from 'axios';
import { Layout, Menu, Image } from "antd";
const SubMenu = Menu.SubMenu;
const {  Sider } = Layout;
function SiderComponent() {
    const [colapse, setColapse] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const  onCollapse = () => {
        if(colapse) setColapse(false);
        else setColapse(true);
    }
    const fetchUserData = async () => {
        var userFromLocal=JSON.parse(localStorage.getItem('user-info'))
        //console.log(userFromLocal.id)
        var apiLinkForUserInfo="http://127.0.0.1:8000/api/user/getInfoByID/basic/"+userFromLocal.id
        axios
        .get(apiLinkForUserInfo)
        .then((response) => {
          //console.log(response.data);
          
        })
    }
    useEffect(() => {
        fetchUserData()
      }, [])
    return (
        <Sider collapsible collapsed={colapse} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['']} mode="inline">
                <Menu.Item key="0"   style={{ minHeight:200, padding:5}}>
                    <div  >
                        <Image preview={ false } width={200} src="/logo2.png"/>
                    </div>
                </Menu.Item>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <a href="/User/profile">General</a>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SiderComponent;