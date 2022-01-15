import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MainLayout from "../../../layouts/MainLayout";

import {
  List,
  Card,
  Avatar,
  Row,
  Col,
  Skeleton,
  Tag,
  Image,
  Button,
  Tooltip,
  Form,
  Input,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const { Meta } = Card;
const { CheckableTag } = Tag;
function FavoritePage() {
  const [favorite, setFavorite] = React.useState([]);
  const fetchFavorite = async () => {
    var userFromLocal = JSON.parse(localStorage.getItem("user-info"));
    // // console.log(userFromLocal.id)
    var apiLinkForUserFavorite =
      "http://127.0.0.1:8000/api/user/favorite/get-all/user/" +
      userFromLocal.id;
    console.log(apiLinkForUserFavorite);
    axios.get(apiLinkForUserFavorite).then((response) => {
      const inforTemp = response.data;
      console.log(inforTemp);
      setFavorite(inforTemp);
    });

    // console.log(mangas)
  };
  const deleteFavoriteButtonOnClick = (values) => {
    console.log(values.mangaId);
  };
  useEffect(() => {
    fetchFavorite();
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
                dataSource={favorite}
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
                      className="history-list"
                      avatar={
                        <Avatar
                          style={{ height: 100, width: 100 }}
                          src={item.mangaImage}
                        />
                      }
                      title={
                        <a
                          style={{ color: "#fff" }}
                          href={
                            "http://localhost:3000/Public/manga?id=" +
                            item.mangaId
                          }
                        >
                          {item.mangaName}
                        </a>
                      }
                      description={
                        <div style={{ color: "#fff" }}>
                          <Form onFinish={deleteFavoriteButtonOnClick}>
                            <Form.Item
                              label=""
                              name="mangaId"
                              initialValue={item.mangaId}
                              hidden
                            >
                              <Input />
                            </Form.Item>
                            <Tooltip title="Xóa khỏi yêu thích">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  shape="circle"
                                  danger
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                </Button>
                              </Form.Item>
                            </Tooltip>
                          </Form>
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

export default FavoritePage;
