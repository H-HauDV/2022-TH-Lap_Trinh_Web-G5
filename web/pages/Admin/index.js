
import React, { useEffect, useState } from "react";
import props from 'prop-types';
import ReactDOM from 'react-dom';

import { Menu, Breadcrumb } from 'antd';
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios';
import { List, Card, Button, Tooltip, Table, Row, Col, Rate, Tag, Divider } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faUsers, faTags, faSpinner, faUserPlus, faEye, faBookmark, faPaperPlane} from '@fortawesome/free-solid-svg-icons'


const { Meta } = Card;


function AdminPage() {
  const [isLoading, setLoading] = useState(false); 
  const [totalManga, setTotalManga] = React.useState();
  function test(){
    console.log(mangas)
  }
  const fetchTotalManga = async () => {
    axios
    .get('http://127.0.0.1:8000/api/manga/total')
    .then((response) => {
      setTotalManga(response.data)
    })
  }
  useEffect(() => {
    fetchTotalManga()
  }, [])
  return (
    <div id="MainContent">
      <AdminLayout>
        <Row gutter={16}>
          <Col className="" span={8}>
          <Card title="Total manga" bordered={false}>
              {totalManga}
            </Card>
          </Col>
          <Col className="" span={8}>
            <Card title="User number" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col className="" span={8}>
            <Card title="Staff number" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </AdminLayout>
    </div>
  );
}

export default AdminPage;

