

import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Layout, Menu  } from "antd";
const SubMenu = Menu.SubMenu;
const {  Sider } = Layout;
function SiderComponent() {
    const [colapse, setColapse] = React.useState(false);
    const  onCollapse = () => {
        if(colapse) setColapse(false);
        else setColapse(true);
      }
    return (
        <Sider collapsible collapsed={colapse} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <a href="/Admin">General</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <a href="/Admin/add-manga">Add manga</a>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
                Files
            </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SiderComponent;

