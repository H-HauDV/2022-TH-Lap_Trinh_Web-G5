
import React, { useEffect, useState } from "react"
import "./styles.module.css"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Layout, Menu, AutoComplete , Button  } from "antd"
const { Header } = Layout;
function Navbar() {
    const [userName, setUserName] = useState([])
    const [userAvatar, setUserAvatar] =useState('')
    const [userLogin, setUserLogin] =useState(false)
    const [searchOption, setSearchOption] = useState([])
    const router = useRouter()
    const fetchBasicUserData = async () => {
      try{
        var userFromLocal=JSON.parse(localStorage.getItem('user-info'))
        var apiLinkForBasicUserInfo="http://127.0.0.1:8000/api/user/getInfoByID/advanced/"+userFromLocal.id
        axios
        .get(apiLinkForBasicUserInfo)
        .then((response) => {
          //console.log(response.data)
          setUserName(response.data.name)
          if (response.data.avatar==null) {
            setUserAvatar("/user_default/avatar.png")
          }else {
            setUserAvatar(response.data.avatar)
          }
          setUserLogin(true)
        })
        //console.log(userAvatar)
      }catch(e){}
    }
    function userLogout(){
      localStorage.removeItem('user-info')
      console.log('logout')
      router.reload(window.location.pathname)
    }
    function convertUnicode(input) {
      return input.replace(/\\u[0-9a-fA-F]{4}/g,function(a,b) {
        var charcode = parseInt(b,16);
        return String.fromCharCode(charcode);
      });
    }
    const onSearchInput = (searchText) => {
      console.log(searchText)
      var apiLinkForSearchSuggestion="http://127.0.0.1:8000/api/manga/search/suggestion/fromName/"+searchText
        axios
        .get(apiLinkForSearchSuggestion)
        .then((response) => {
          // console.log(response.data)
          setSearchOption()
          let searchOptionTemp=new Array()
          for(var i=0; i<response.data.length; i++){
            console.log(response.data[i].mangaName)
            searchOptionTemp.push(convertUnicode(response.data[i].mangaName))
          }
          console.log(searchOptionTemp)
          setSearchOption(searchOptionTemp)
          console.log(searchOption)
        })
      
    };
    const onSearchSelect = (data) => {
      console.log('onSelect', data);
    };
    useEffect(() => {
      fetchBasicUserData()
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
        <Menu.Item style={{ marginLeft: 'auto' }} key='2'>
          <AutoComplete
          options={searchOption}
          style={{ width: 200 }}
          onSelect={onSearchSelect}
          onSearch={onSearchInput}
          placeholder="Search"
        />
        </Menu.Item>
        
          {
            userLogin ?
              <>
                <Menu.Item style={{ }} key='3'><img width={50} src={userAvatar}/></Menu.Item>
                <Menu.Item style={{ }} key='4'><Link href="/User/profile" ><a>Profile</a></Link></Menu.Item>
                <Menu.Item style={{ }} key='5'><div onClick={userLogout}>Logout</div></Menu.Item>
              </>
              :
              <>
                <Menu.Item style={{ }} key='3'><Link href="/Auth/User/login" ><a>Log In</a></Link></Menu.Item>
                <Menu.Item style={{ }} key='4'><Link href="/Auth/User/register" ><a>Sign Up</a></Link></Menu.Item>
              </>
          }
        
      </Menu>
    </Header>
        
    );
}

export default Navbar;
