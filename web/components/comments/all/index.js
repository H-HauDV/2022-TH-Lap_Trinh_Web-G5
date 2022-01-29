import axios from "axios";
import React, { useEffect, useState } from "react";
import { List, Card, Avatar, Link } from "antd";
import { useRouter } from "next/router";
function AllComments() {
  const [comments, setComment] = React.useState([]);
  const getNewComments = async () => {
    axios.get("http://127.0.0.1:8000/api/comments/new").then((response) => {
      // console.log(response.data);
      setComment(response.data);
    });
  };
  useEffect(() => {
    getNewComments();
  }, []);
  return (
    <>
      <Card
        className="card-head"
        title="Comment"
        bordered={false}
        style={{ backgroundColor: "#343a40", borderRadius: 5 }}
      >
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                className="text-white"
                avatar={
                  <Avatar
                    src={
                      comment.user_avatar == null
                        ? "https://joeschmoe.io/api/v1/random"
                        : comment.user_avatar
                    }
                  />
                }
                title={
                  <a style={{ color: "#fff" }} href="https://ant.design">
                    {comment.user_name}
                  </a>
                }
                description={
                  <>
                    <p style={{ color: "#fff" }}>{comment.content}</p>
                    <a href={"/Public/manga?id=" + comment.manga_id}>
                      {comment.manga_name}
                    </a>
                    <>&nbsp;-&nbsp;</>
                    <a
                      href={"/Public/chapter?id=" + comment.chapter_id}
                      style={{ color: "#e67e22" }}
                    >
                      Chapter {comment.chapter_name}
                    </a>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
export default AllComments;
