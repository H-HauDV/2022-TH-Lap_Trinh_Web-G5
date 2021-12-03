
import React, { useEffect, useState } from "react";
import "./styles.module.css"
import Link from 'next/link'
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
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['']}>
        <Menu.Item key='1'>
          <Link href="/Public">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key='2'>Page1</Menu.Item>
        <Menu.Item style={{ marginLeft: 'auto' }} key='3'>
          <Link href="/Auth/User/login" >
            Log In
          </Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link href="/Auth/User/register">
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
        
    );
}

export default Navbar;
