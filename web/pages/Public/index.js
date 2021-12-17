
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
  const initCarosel = async () => {
    axios
    .get('http://127.0.0.1:8000/api/manga/carousel')
    .then((response) => {
      // console.log(response)
      setCarousel(response.data)
    })
  }
  const handleMangaCardClick=(mangaID,mangaName) => {
    if(mangaID==0) router.push("Public/all-manga")
    else{
      var link="Public/manga?id="+mangaID
      router.push(link)
    }
  }
  useEffect(() => {
    getNewComments()
    fetchManga()
    initCarosel()
    fetchTags()
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
        <Row style={{ marginBottom:20, }}>
          <Col span={24}>
            <Card className="card-head" title="Truyen Hot" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
              <Carousel autoplay className="">
                <div>
                  <List
                    dataSource={carousel.slice(0, 5)}
                    grid={{ gutter: 16, column: 5 }}
                    renderItem={carousel => (
                      <List.Item>
                      <Card
                        className=""
                        hoverable
                        bordered={false}
                        style={{ backgroundColor: "#343a40", width: 200 }}
                        cover={<img width={180} height={272} alt="example" src={carousel.main_image} />}
                        key={carousel.id}
                        onClick={() => {
                          handleMangaCardClick(carousel.id,carousel.name)
                        }}
                      >
                        <Meta className="meta-white" title={carousel.name}/>
                      </Card>
                    </List.Item>
                    )}
                  />
                </div>
              <div>
              <List
                    dataSource={carousel.slice(5, 10)}
                    grid={{ gutter: 16, column: 5 }}
                    renderItem={carousel => (
                      <List.Item>
                      <Card
                        className="is-dark-background is-rounded-25rem"
                        hoverable
                        bordered={false}
                        style={{ backgroundColor: "#343a40" ,width: 200 }}
                        cover={<img width={180} height={272} alt="example" src={carousel.main_image} />}
                        key={carousel.id}
                        onClick={() => {
                          handleMangaCardClick(carousel.id,carousel.name)
                        }}
                      >
                        <Meta className="meta-white" title={carousel.name}/>
                      </Card>
                    </List.Item>
                    )}
                />
              </div>
            </Carousel>
            </Card>
          </Col >
        </ Row>
      <Row>
        <Col className="" span={15}>
          <Row className="" >
            <Col className="" span={24}>
              <Card className="card-head" title="Moi cap nhat" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
                <List
                  className="is-padding-24 "
                  grid={{ gutter: 36, column: 4 }}
                  dataSource={mangas}
                  
                  renderItem={manga => (
                    <List.Item>
                      <Card
                        className=""
                        hoverable
                        bordered={false}
                        style={{ backgroundColor: "#343a40" ,width: 150 }}
                        cover={<img width={140} height={200} alt="example" src={manga.main_image} />}
                        key={manga.id}
                        onClick={() => {
                        handleMangaCardClick(manga.id,manga.name)
                        }}
                      >
                        <Meta 
                          className="meta-white" 
                          title={manga.name} 
                        />
                      </Card>
                    </List.Item>
                    
                  )}
                />
                </Card>
              </Col>
            </Row>
          </Col>
        <Col className="" span={8} offset={1}>
          <Row style={{ paddingBottom: 20,}} className="" >
            <Col className="" span={24}>
              <Card className="card-head" title="Comment" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
              <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                  <List.Item>
                    <List.Item.Meta
                      className="text-white"
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={<a style={{ color: "#fff"}}href="https://ant.design">{comment.user_name}</a>}
                      description={<p style={{ color: "#fff"}}>{comment.content}</p>}
                    />
                  </List.Item>
                )}
              />
              </Card>
            </Col>
          </Row>
          <Row className="" >
            <Col className="" span={24}>
              <Card className="card-head" title="Category" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
              <List
                className="category-list"
                itemLayout="horizontal"
                dataSource={tags}
                renderItem={tag => (
                  <List.Item>
                    <CheckableTag
                      key={tag}
                      checked={selectedTags.indexOf(tag) > -1}
                      onChange={checked => handleSelectTag(tag, checked)}
                    >

                      {tag.category_name}
                    </CheckableTag>
                  </List.Item>
                  
                )}
              />
              </Card>
            </Col>
          </Row>
        </Col>
      </ Row>
      </MainLayout>
    </div>
  );
}

export default HomePage;
