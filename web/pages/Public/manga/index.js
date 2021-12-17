import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MainLayout from "../../../layouts/MainLayout";
import AllComment from "../../../components/comments/all";

import {
  List,
  Card,
  Button,
  Tooltip,
  Table,
  Row,
  Col,
  Rate,
  Tag,
  Divider,
  Avatar,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faUsers,
  faTags,
  faSpinner,
  faUserPlus,
  faEye,
  faBookmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const { Meta } = Card;

function MangaPage() {
  const [manga, setManga] = React.useState([]);
  const [tags, setTag] = React.useState([]);
  const [viewCount, setViewCount] = React.useState([]);
  const [comments, setComment] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "chapter_name",
      key: "Name",
      visible: false,
      render: (value) => {
        return (
          <a
            onClick={() => {
              openChapterPage(value);
            }}
            target="_blank"
          >
            {value}
          </a>
        );
      },
    },
    {
      title: "UpdateTime",
      dataIndex: "update_date",
      key: "UpdateTime",
      visible: false,
      render: (value) => {
        return <div>{calculateDateAgo(value)}</div>;
      },
    },
    {
      title: "ViewCount",
      dataIndex: "view",
      key: "ViewCount",
      visible: false,
    },
  ];
  const renderHeader = (props, columns) => {
    return (
      <tr>
        {columns.map((item, idx) => {
          if (item.visible) return props.children[idx];
        })}
      </tr>
    );
  };
  const moment = require("moment");
  const calculateDateAgo = (date) => {
    return moment.utc(date).local().startOf("seconds").fromNow();
  };
  const openChapterPage = (chapterName) => {
    console.log("getting");
    var link = "";
    chapter.map((aChapter) => {
      if (aChapter.chapter_name == chapterName)
        link = "/Public/chapter?id=" + aChapter.chapter_id;
    });
    router.push(link);
  };
  const fetchData = async () => {
    const querries = parseUrlQuery(window.location);
    var apiLinkForManga =
      "http://127.0.0.1:8000/api/manga/get/mangaInfor/fromID/" + querries.id[0];
    var apiLinkForTag = "http://127.0.0.1:8000/api/mangaTags/" + querries.id[0];
    var apiLinkForViewCount =
      "http://127.0.0.1:8000/api/mangaViewCount/" + querries.id[0];
    var apiLinkForChapters =
      "http://127.0.0.1:8000/api/manga/get/chapterList/" + querries.id[0];
    axios.get(apiLinkForManga).then((response1) => {
      console.log(response1.data);
      setManga(response1.data);
    });
    axios.get(apiLinkForTag).then((response2) => {
      console.log(response2.data);
      setTag(response2.data);
    });
    axios.get(apiLinkForViewCount).then((response3) => {
      console.log(response3.data[0].count);
      setViewCount(response3.data[0].count);
    });
    axios.get(apiLinkForChapters).then((response4) => {
      console.log(response4.data);
      setChapter(response4.data);
    });
  };
  const getNewComments = async () => {
    axios.get("http://127.0.0.1:8000/api/comments/new").then((response) => {
      // console.log(response.data);
      setComment(response.data);
    });
  };
  const parseUrlQuery = (value) => {
    var urlParams = new URL(value).searchParams;
    return Array.from(urlParams.keys()).reduce((acc, key) => {
      acc[key] = urlParams.getAll(key);
      return acc;
    }, {});
  };
  function test() {
    console.log(mangas);
  }
  useEffect(() => {
    fetchData();
    getNewComments();
  }, []);
  return (
    <div id="MainContent">
      <MainLayout>
        <Row className="">
          <Col className="" span={15}>
            <Row
              style={{
                backgroundColor: "#343a40",
                borderRadius: 5,
                marginBottom: 20,
                padding: 20,
              }}
            >
              <Col style={{ padding: 10 }} className="" span={8}>
                <img
                  alt="example"
                  style={{ width: 240 }}
                  src={manga.main_image}
                />
                <h3 className="text-white">Rating</h3>
                <Rate disabled defaultValue={2} />
              </Col>
              <Col className="" span={14} offset={2}>
                <h2 className="text-white" text-white>
                  {manga.name}
                </h2>
                <div
                  className="same-row text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faClone} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Tên gọi khác: &nbsp; </b>
                  </h4>
                  <h4>
                    <Tag color="#108ee9">{manga.alter_name}</Tag>
                  </h4>
                </div>
                <div
                  className="same-row text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faUsers} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Tác giả: &nbsp; </b>
                  </h4>
                  <h4>
                    <Tag color="#108ee9">{manga.author}</Tag>
                  </h4>
                </div>
                <div
                  className="same-row text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faTags} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Thể loại: &nbsp; </b>
                  </h4>
                  <h4 className="same-row ">
                    {tags.map((tag) => (
                      <Tag
                        style={{ height: 25, paddingLeft: 1, paddingRight: 1 }}
                        color="#f50"
                      >
                        {tag.category_name}
                      </Tag>
                    ))}
                  </h4>
                </div>
                <div
                  className="same-row text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faSpinner} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Tình trạng: &nbsp; </b>
                  </h4>
                  <h4 className="text-white">
                    {(manga.status = 1) ? "Đang tiến hành" : "Đã hoàn thành"}{" "}
                  </h4>
                </div>
                <div
                  className="same-row  text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Nhóm dịch: &nbsp; </b>
                  </h4>
                  <h4 className="text-white">{manga.source} </h4>
                </div>
                <div
                  className="same-row text-white"
                  style={{ marginBottom: 10 }}
                >
                  <FontAwesomeIcon icon={faEye} />
                  &nbsp;
                  <h4 className="text-white">
                    <b> Lượt xem: &nbsp; </b>
                  </h4>
                  <h4 className="text-white">{viewCount} </h4>
                </div>
                <div style={{ marginBottom: 15 }}>
                  <Tooltip title="Follow">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#3f6791",
                        borderColor: "#3f6791",
                      }}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                      &nbsp; Theo dõi
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Latest">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#e12e1c",
                        borderColor: "#e12e1c",
                      }}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      &nbsp; Đọc mới nhất
                    </Button>
                  </Tooltip>
                </div>
              </Col>
              <Divider dashed />
              <div>
                <h2 className="text-white">Sơ lược</h2>
                <h4 className="text-white">{manga.description}</h4>
              </div>
            </Row>
            <Card
              className="card-head"
              title="Danh sach chuong"
              bordered={false}
              style={{ backgroundColor: "#343a40", borderRadius: 5 }}
            >
              <Row style={{}}>
                <Table
                  scroll={{ y: 400 }}
                  pagination={false}
                  dataSource={chapter}
                  columns={columns}
                  className="table-black text-white"
                  components={{
                    header: {
                      row: (props) => renderHeader(props, columns),
                    },
                  }}
                />
              </Row>
            </Card>
          </Col>
          <Col className="" span={8} offset={1}>
            <AllComment></AllComment>
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default MangaPage;
