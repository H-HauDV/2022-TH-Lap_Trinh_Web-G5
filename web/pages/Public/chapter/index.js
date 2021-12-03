
import React, { useEffect, useState } from "react";
import props from 'prop-types';
import ReactDOM from 'react-dom';

import { Menu, Breadcrumb } from 'antd';
import MainLayout from '../../../layouts/MainLayout'
import axios from 'axios';
import { List, Card, Button, Tooltip, Table, Row, Col, Rate, Tag, Divider } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faUsers, faTags, faSpinner, faUserPlus, faEye, faBookmark, faPaperPlane} from '@fortawesome/free-solid-svg-icons'


const { Meta } = Card;


function ChapterPage() {
  const [image, setImage] = React.useState([]);
  const [isLoading, setLoading] = useState(false); 
 
  const fetchData = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForImages="http://127.0.0.1:8000/api/chapterImageList/"+querries.id[0]
    axios
    .get(apiLinkForImages)
    .then((response) => {
      console.log(response.data);
      setImage(response.data)
    })

  }
  const parseUrlQuery = (value) => {
    var urlParams = new URL(value).searchParams
    return Array.from(urlParams.keys()).reduce((acc, key) => {
      acc[key] = urlParams.getAll(key)
      return acc
    }, {})
  }
  function test(){
    console.log(mangas)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div id="MainContent">
      <MainLayout>
        <Row>
          <Col className="" span={24}>
          <List
            dataSource={image}
            grid={{ gutter: 16, column: 5 }}
            renderItem={image => (
                <List.Item>
                    <img src={image.image_link}></img>
                </List.Item>
                )}
                />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default ChapterPage;

