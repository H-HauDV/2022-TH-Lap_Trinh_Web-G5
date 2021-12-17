
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout'

import { List, Card, Avatar, Row, Col, Carousel, Tag  } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faNewspaper} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
const { Meta } = Card;
const { CheckableTag } = Tag;
function HomePage() {
  const [mangas, setManga] = React.useState([]);
  const [comments, setComment] = React.useState([]);
  const [carousel, setCarousel] = React.useState([]);
  const [isLoading, setLoading] = useState(false); 
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [idOfLastCarousel, setIdOfLastCarousel] = React.useState();
  const router = useRouter()
  const fetchManga = async () => {
    axios
    .get('http://127.0.0.1:8000/api/manga/homePage')
    .then((response) => {
      // console.log(response.data)
      setIdOfLastCarousel(response.data[response.data.length-1].id)
      var more={id:0, name:"", main_image:"/MangaMore.png"} // variable want to add to array
      var updatedMangasArray = [...response.data, more];
      console.log(updatedMangasArray)
      setManga(updatedMangasArray)
    })

    // console.log(mangas)
    
  }
  const fetchTags = async () => {
    axios
    .get('http://127.0.0.1:8000/api/manga/tags')
    .then((response) => {
        //console.log(response.data)
        setTags(response.data)
        // console.log(tags)
    })
  }
  const getNewComments = async () => {
    axios
    .get('http://127.0.0.1:8000/api/comments/new')
    .then((response) => {
      // console.log(response.data);
      setComment(response.data)
    })
  }
  useEffect(() => {
    getNewComments()

  }, [])
  const initSelectedTags=()=>{
    var index = 0;
    while (index < tags.length){
      console.log(tags.id)
      //setSelectedTags([...selectedTags,{ id: tags.id, checked: false}])
  }
  }
  const handleSelectTag=(tag, checked)=> {
    // console.log(tag, checked)
    // setSelectedTags([...selectedTags,tag.id]);
    // console.log(selectedTags)

  }
  return (
    <div id="MainContent">
      <MainLayout>
       <h3>aaaaaaaaaaaaaaaa</h3>
      </MainLayout>
    </div>
  );
}

export default HomePage;
