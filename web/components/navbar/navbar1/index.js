
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
    const { Option } = AutoComplete
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
    const onSearchInput = (searchText) => {
      // console.log(searchText)
      if(searchText!=null){
      var apiLinkForSearchSuggestion="http://127.0.0.1:8000/api/manga/search/suggestion/fromName/"+searchText
      console.log(apiLinkForSearchSuggestion)
        axios
        .get(apiLinkForSearchSuggestion)
        .then((response) => {
          // console.log(response.data)
          // setSearchOption()
          let searchOptionTemp=new Array()
          for(var i=0; i<response.data.length; i++){
            //console.log(response.data[i].mangaName)
            searchOptionTemp.push(response.data[i].mangaName)
          }

          setSearchOption(searchOptionTemp)
          console.log(searchOption)
        })
      }else{

      }
    };

    const onSearchSelect = (data) => {
      var mangaID=0
      var apiLinkForGetMangaID="http://127.0.0.1:8000/api/manga/get/mangaID/fromName/"+data
      axios
      .get(apiLinkForGetMangaID)
      .then((response) => {
        mangaID=response.data.id
        var link="/Public/manga?id="+mangaID
        router.push(link)
      })
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
            style={{
              width: 200,
            }}
            onSearch={onSearchInput}
            onSelect={onSearchSelect}
            placeholder="input here"
          >
            {searchOption.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </AutoComplete>
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
