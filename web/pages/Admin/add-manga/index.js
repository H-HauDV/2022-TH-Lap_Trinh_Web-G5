
import React, { useEffect, useState } from "react";
import props from 'prop-types';
import ReactDOM from 'react-dom';

import { Menu, Breadcrumb } from 'antd';
import AdminLayout from '../../../layouts/AdminLayout'
import axios from 'axios';
import { List, Card, Button, Form, Row, Input, Select, Col, Upload } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faUsers, faTags, faSpinner, faUserPlus, faEye, faBookmark, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Option } = Select;

function AddManga() {
  const [isLoading, setLoading] = useState(false); 
  const [mangaNameValidateStatus, setMangaNameValidateStatus] = useState(""); 
  const [totalManga, setTotalManga] = React.useState();
  const [tags, setTags] = React.useState([]);
  const [selectedFiles,setSelectedFiles]=React.useState([]);
  function test(){
    console.log(mangas)
  }
  const fetchTotalManga = async () => {
    axios
    .get('http://127.0.0.1:8000/api/manga/total')
    .then((response) => {
      setTotalManga(response.data)
    })
    axios
    .get('http://127.0.0.1:8000/api/manga/tags')
    .then((response) => {
        setTags( response.data)
        //console.log(tags)
    })
  }
  const initCategoryOption = tags.map((tag) =>  <Option key={tag.id}>{tag.category_name}</Option>);
  useEffect(() => {
    fetchTotalManga()
  }, [])
  const handleImageChange =(e) =>{
    setSelectedFiles([]);
    if(e.target.files){
      const filesArray=Array.from(e.target.file).map((file)=>URL.createObjectURL(file))
      setSelectedFiles((prevImages)=>prevImages.concat(filesArray))
      Array.from(e.target.file).map(
        (file)=>URL.revokeObjectURL(file)
      );
    }
  }
  const onFinish = (values) => {
    console.log(values.chapters);
    fetch(
			'http://127.0.0.1:8000/api/upload/file/chapters',
			{
				method: 'POST',
				body: values.chapters,
			}
		)
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  function checkMangaName(e){
    var checkLink="http://127.0.0.1:8000/api/checkManga/name/"+e.target.value
    axios
    .get(checkLink)
    .then((response) => {
        console.log( response.data)
        if(response.data==0){
            setMangaNameValidateStatus("success")
        }else{
            setMangaNameValidateStatus("error")
        }
        console.log(mangaNameValidateStatus)
    })
  }
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div id="MainContent">
      <AdminLayout>
        <Row>
            <Col className="" span={24}>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    encType="multipart/form-data"
                    >
                    <Form.Item label="Manga name" name="mangaName" 
                        validateStatus={mangaNameValidateStatus} 
                        rules={[{ required: true, message: 'Please input Manga name!' }]}
                    >
                        <Input onChange={checkMangaName}/>
                    </Form.Item>

                    <Form.Item label="Main image" name="mainImage" rules={[{ required: true, message: 'Please input your Main image!' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: false}]} >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Alter name" name="alterName" rules={[{ required: false}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Author" name="author" rules={[{ required: false}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Translator" name="source" rules={[{ required: false}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Select placeholder="Select a status for manga" allowClear >
                            <Option value="1">Finish</Option>
                            <Option value="0">Not finish</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Categories">
                        <Select mode="multiple" placeholder="Please select category" onChange={handleChange} style={{ width: '100%' }} allowClear>
                            {initCategoryOption}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chapter">
                      <Form.Item name="chapters" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger type="file" name="file" id="file" multiple onChange={handleImageChange}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
      </AdminLayout>
    </div>
  );
}

export default AddManga;
