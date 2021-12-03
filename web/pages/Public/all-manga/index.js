
import React, { useEffect, useState } from "react";
import props from 'prop-types';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb } from 'antd';
import MainLayout from '../../layouts/Layout'
import axios from 'axios';
import { List, Card, Button, Row, Col, Carousel  } from 'antd';
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faNewspaper} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const { Meta } = Card;


function AllMangaPage() {
  const [mangas, setManga] = React.useState([]);
  const [totalManga, setTotalManga] = React.useState();
  const [carousel, setCarousel] = React.useState([]);
  const [isLoading, setLoading] = useState(false); 
  const router = useRouter()
  const fetchManga = async () => {
    axios
    .get('/api/mangas')
    .then((response) => {
      // console.log(response.data);
      setManga(response.data)
    })
  }

  const fetchTotalManga = async () => {
    axios
    .get('/api/totalManga')
    .then((response) => {
      setTotalManga(response.data)
    })
  }
  const initCarosel = async () => {
    axios
    .get('/api/mangaCarosel')
    .then((response) => {
      // console.log(response)
      setCarousel(response.data)
    })
  }
  const handleMangaCardClick=(mangaID,mangaName) => {
    console.log(mangaID)
    console.log(mangas)
    var link="/manga?id="+mangaID
    router.push(link)
  }
  useEffect(() => {
    fetchManga()
    fetchTotalManga()
    initCarosel()
  }, [])
  return (
    <div id="MainContent">
      <MainLayout>
      <Row>
        <Col className="" span={19}>
          <Row className="is-dark-background is-rounded-25rem">
            <Col className="" span={24}>
              <div className="section-header">
                <FontAwesomeIcon icon={faNewspaper} />&nbsp;    
                Truyện mới cập nhật
              </div>
              <List
                className="is-padding-24 "
                grid={{ gutter: 36, column: 4 }}
                dataSource={mangas.slice(0, 11)}
                
                renderItem={manga => (
                  <List.Item>
                    <Card
                      className="is-dark-background is-rounded-25rem"
                      hoverable
                      bordered={false}
                      style={{ width: 150 }}
                      cover={<img width={140} height={200} alt="example" src={manga.main_image} />}
                      key={manga.id}
                      onClick={() => {
                        handleMangaCardClick(manga.id,manga.name)
                      }}
                    >
                      <Meta 
                        className="is-text-white" 
                        title={manga.name} 
                        />
                    </Card>
                  </List.Item>
                )}
              />
              </Col>
            </Row>
          </Col>
        <Col className="" span={4} offset={1}>
          col-8
        </Col>
      </ Row>
      </MainLayout>
    </div>
  );
}

export default AllMangaPage;

if (document.getElementById('AllMangaPage')) {
  ReactDOM.render(<AllMangaPage />, document.getElementById('AllMangaPage'));
}