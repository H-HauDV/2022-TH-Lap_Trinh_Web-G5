import axios from "axios";
import React, { useEffect, useState } from "react";
import { List, Card, Avatar } from "antd";
import { useRouter } from "next/router";
import Loading from "../../loading"
function MangaComments(props) {
  const [comments, setComment] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const getNewComments = async () => {
    var link="http://127.0.0.1:8000/api/comments/manga/"+props.mangaID
    console.log(link)
    axios.get(link).then((response) => {
        console.log(response)
      setComment(response.data);
    });
  };
  useEffect(() => {
    getNewComments();
    setLoading(false)
  }, []);
  if (loading) {
    return <Loading></Loading>
  }
  return (
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
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <a style={{ color: "#fff" }} href="https://ant.design">
                  {comment.user_name}
                </a>
              }
              description={<p style={{ color: "#fff" }}>{comment.content}</p>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
export default MangaComments;
