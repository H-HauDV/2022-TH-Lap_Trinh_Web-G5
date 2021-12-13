import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar1";
import FooterComponent from "../../components/footer";
import { UserOutlined, LaptopOutlined, NotificationOutlined} from "@ant-design/icons";
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function MainLayout({children}) {
    return (
        <Layout>
            <Navbar />
            <Layout>
                <Layout className="" 
                    style={{ 
                        padding: "0 24px 24px",
                        backgroundColor: "#454d55",
                    }}>

                    <Content
                        className="main-layout"
                        style={{
                            marginLeft: 180,
                            marginRight: 180,
                            marginTop: 30,
                            minHeight: 280,
                            backgroundColor: "#454d55",
                        }}
                    ><main>{children}</main></Content>
                </Layout>
            </Layout>
            <FooterComponent/>
        </Layout>
    );
}

export default MainLayout;
