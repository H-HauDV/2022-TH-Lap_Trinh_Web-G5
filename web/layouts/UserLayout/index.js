import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from "antd";
import Navbar from "../../components/navbar/navbar1";
import SiderComponent from "../../components/sider/UserSider";


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function UserLayout({children}) {
    return (
            <Layout style={{minHeight:"100vh"}}> 
            <SiderComponent/>
                <Layout className="gray-layout-content" style={{ padding: "0", backgroundColor: "#454d55", }}>
                    <Navbar />
                    <Content 
                        className=""
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                            
                        }}
                    ><main>{children}</main></Content>
                </Layout>
        </Layout>
    );
}

export default UserLayout;
