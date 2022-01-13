import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MainLayout from "../../../layouts/MainLayout";

import { List, Card, Avatar, Row, Col, Skeleton, Tag, Image } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const { Meta } = Card;
const { CheckableTag } = Tag;
function HistoryPage() {
  const [history, setHistory] = React.useState([]);
  const fetchHistory = async () => {
    var userFromLocal = JSON.parse(localStorage.getItem("user-info"));
    // // console.log(userFromLocal.id)
    var apiLinkForUserHistory =
      "http://127.0.0.1:8000/api/user/history/get/" + userFromLocal.id;
    axios.get(apiLinkForUserHistory).then((response) => {
      const inforTemp = response.data;
      console.log(inforTemp);
      setHistory(inforTemp);
    });

    // console.log(mangas)
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <div id="MainContent">
      <MainLayout>
        <Row style={{ marginBottom: 20 }}>
          <Col span={24}>
            <Card
              className="card-head"
              title="Lịch sử đọc truyện của bạn"
              bordered={false}
              style={{ backgroundColor: "#343a40", borderRadius: 5 }}
            >
              <List
                className="is-padding-24 "
                grid={{ gutter: 36, column: 1 }}
                dataSource={history}
                renderItem={(item) => (
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      style={{
                        backgroundColor: "#454d55",
                        color: "#fff",
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                      }}
                      avatar={
                        <Avatar
                          style={{ height: 100, width: 100 }}
                          src={item.mangaImage}
                        />
                      }
                      title={
                        <a style={{ color: "#fff" }} href={"http://localhost:3000/Public/manga?id="+item.mangaId}>
                          {item.mangaName}
                        </a>
                      }
                      description={
                        <div style={{ color: "#fff" }}>
                          <a  href={"http://localhost:3000/Public/chapter?id="+item.chapterId}>
                            Last chapter read: {item.chapterCount}
                          </a>
                          <p>
                            At: {item.readDate}
                          </p>
                        </div>
                      }
                    />
                  </Skeleton>
                )}
              />
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default HistoryPage;
