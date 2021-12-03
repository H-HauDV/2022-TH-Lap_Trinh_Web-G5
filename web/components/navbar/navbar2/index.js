
import React, { useEffect, useState } from "react";

import { Layout, Menu  } from "antd";
const { Header } = Layout;
function Navbar() {
    const [user, setUser] = useState(null)
    const fetchUser = () => {
    }
    useEffect(() => {
      fetchUser()
    }, [])

    return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key='1'>About</Menu.Item>
        <Menu.Item key='2'>Page1</Menu.Item>
        <Menu.Item style={{ marginLeft: 'auto' }} key='3'>
          <a href="http://localhost:3000/Auth/User/login" target="_blank">
            Log In
          </a>
        </Menu.Item>
        <Menu.Item key='4'>
          <a href="http://localhost:3000/Auth/User/register" target="_blank">
            Sign In
          </a>
        </Menu.Item>
      </Menu>
    </Header>
        
    );
}

export default Navbar;
