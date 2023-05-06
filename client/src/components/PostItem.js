import { BASE_URL } from "@/constants";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
const PostItem = (props) => {
  const [post, setPosts] = useState(null);
  useEffect(() => {
    setPosts(props.post);
  }, [props.post]);
  if (!post) return <div>Not found</div>;
  return (
    <>
      <Row className="post-page__item mb-3">
        <Col md={6}>
          {console.log(post)}
          <Link
            href={`/post/${post.url}.${post._id}`}
            className="post-page__item-image"
          >
            <img
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src={
                post.images?.length > 0 && post.images[0]
                  ? `${BASE_URL}/${post.images[0]}`
                  : "https://static-prod.adweek.com/wp-content/uploads/2017/07/ContentIsKing.jpg.webp"
              }
            />
          </Link>
        </Col>
        <Col md={6}>
          <h2>{post.title}</h2>
          <p style={{ height: "100px", overflow: "hidden" }}>
            {post.description}
          </p>
          <Link href={`/post/${post.url}.${post._id}`}>Read More..</Link>
        </Col>
      </Row>
      <hr />
    </>
  );
};
export default PostItem;
