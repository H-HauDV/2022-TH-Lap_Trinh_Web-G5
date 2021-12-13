
import React, { useEffect, useState } from "react";
import props from 'prop-types';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb } from 'antd';
import MainLayout from '../../../layouts/MainLayout'
import axios from 'axios';
import { List, Card, Image , Button, Table, Row, Col, Rate, Tag, Divider } from 'antd';
import { useRouter } from 'next/router'



const { Meta } = Card;


function ChapterPage() {
  const router = useRouter()
  const [image, setImage] = React.useState([]);
  const [isLoading, setLoading] = useState(false); 
  const [comments, setComment] = React.useState([]);
  const [nextDisable, setNextDisable] = useState(false); 
  const [prevDisable, setPrevDisable] = useState(false); 
  const [nextChapter, setNextChapter] = useState(); 
  const [prevChapter, setPrevChapter] = useState(); 
  const [manga, setManga] = useState(); 


  const fetchImage = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForImages="http://127.0.0.1:8000/api/chapterImageList/"+querries.id[0]
    axios
    .get(apiLinkForImages)
    .then((response) => {
      // console.log(response.data);
      setImage(response.data)
    })
  }
  const getCommentsOfChapter = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForCommentOfchapter="http://127.0.0.1:8000/api/comments/chapter/"+querries.id[0]
    //console.log(apiLinkForCommentOfchapter)
    axios
    .get(apiLinkForCommentOfchapter)
    .then((response) => {
      // console.log(response.data);
      setComment(response.data)
    })
  }
  const getMangaFromChapterID = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForMangaInfor="http://127.0.0.1:8000/api/manga/get/mangaName/fromChapterID/"+querries.id[0]
    //console.log(apiLinkForMangaInfor)
    axios
    .get(apiLinkForMangaInfor)
    .then((response) => {
      //console.log(response.data);
      setManga(response.data)
    })
  }
  const getPrevNextChapter = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForNextChapter="http://127.0.0.1:8000/api/getNextChapter/"+querries.id[0]
    var apiLinkForPrevChapter="http://127.0.0.1:8000/api/getPrevChapter/"+querries.id[0]
    axios
    .get(apiLinkForNextChapter)
    .then((response) => {
      //console.log(response.data);
      setNextChapter(response.data)
    }).catch((error) => {
      //console.log(error)
      setNextDisable(true)
    })
    axios
    .get(apiLinkForPrevChapter)
    .then((response) => {
      //console.log(response.data);
      setPrevChapter(response.data)
    })
    .catch((error) => {
      //console.log(error)
      setPrevDisable(true)
    })
  }
  function prevButtonPress(event){
    //event.preventDefault();
    var baseLinkForPrevChapter="/Public/chapter?id="+prevChapter
    //console.log(baseLinkForPrevChapter)
    router.reload(baseLinkForPrevChapter);

  }
  function nextButtonPress(event){
    //event.preventDefault();
    var baseLinkForNextChapter="/Public/chapter?id="+nextChapter
    //console.log(baseLinkForNextChapter)
    router.reload(baseLinkForNextChapter)
  }
  const parseUrlQuery = (value) => {
    var urlParams = new URL(value).searchParams
    return Array.from(urlParams.keys()).reduce((acc, key) => {
      acc[key] = urlParams.getAll(key)
      return acc
    }, {})
  }
  function test(){
    console.log(prevChapter)
    console.log(nextChapter)
  }
  useEffect(() => {
    fetchImage()
    getPrevNextChapter()
    getCommentsOfChapter()
    getMangaFromChapterID()
  }, [])
  return (
    <div id="MainContent">
      <MainLayout>
        <Row>
          <Col className="" span={12} offset={6}>
          <List
            dataSource={image}
            grid={{ gutter: 0, column: 1 }}
            renderItem={image => (
                <List.Item style={{  marginBottom: 0, marginTop: 0, display: "flex" }}>
                  <Image
                    preview={ false }
                    src={image.image_link}
                  />
                </List.Item>
                )}
                />
          </Col>
        </Row>
        <Row style={{ marginTop:20}}>
          <Col className="" span={8} offset={8} style={{ display: 'inline-flex', justifyContent: 'center'}}>
            <Button style={{ marginRight: 10, }} size="large" disabled={prevDisable}><a href={"/Public/chapter?id="+prevChapter}>Previous</a></Button>
            <Button style={{ marginRight: 10}} type="primary" size="large" onClick={test}><a href={"/Public/manga?id="+manga.id}>Return to manga</a></Button>
            <Button style={{}} size="large"disabled={nextDisable} ><a href={"/Public/chapter?id="+nextChapter}>Next</a></Button>
          </Col>
        </Row>
        <Row style={{ paddingTop: 20,}} className="" >
            <Col className="" span={24}>
              <Card className="card-head" title="Comment" bordered={false} style={{  backgroundColor: "#343a40", borderRadius: 5,}}>
              <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                  <List.Item>
                    <List.Item.Meta
                      className="text-white"
                      //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={<a style={{ color: "#fff"}}href="https://ant.design">{comment.user_name}</a>}
                      description={<p style={{ color: "#fff"}}>{comment.content}</p>}
                    />
                  </List.Item>
                )}
              />
              </Card>
            </Col>
          </Row>
      </MainLayout>
    </div>
  );
}

export default ChapterPage;

