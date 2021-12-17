import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from "antd";
import Navbar from "../../components/navbar/navbar2";
import FooterComponent from "../../components/footer";
import SiderComponent from "../../components/sider/AdminSider";


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function MainLayout({children}) {
    return (
        <Layout>
            <Navbar />
            <Layout style={{height:"100vh"}}> 
                <SiderComponent/>
                <Layout className="gray-layout-content" style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content 
                        className=""
                        style={{
                            marginLeft: 100,
                            marginRight: 100,
                            minHeight: 280,
                            
                        }}
                    ><main>{children}</main></Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default MainLayout;

