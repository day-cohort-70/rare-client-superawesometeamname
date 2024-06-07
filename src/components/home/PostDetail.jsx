import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../../managers/PostManager.jsx";
import { FaComment } from "react-icons/fa";
import "bulma/css/bulma.min.css";
import "./PostDetail.css";

export const PostDetail = ({ token }) => {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  const handleAddComment = () => {
    navigate(`/comment/${post_id}`);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <h1 className="title is-3 has-text-centered">{post.title}</h1>
                <div className="content">
                  <figure className="image">
                    <img src={post.image_url} alt="Post" />
                  </figure>
                  <div className="columns is-vcentered is-mobile">
                    <div className="column is-half">
                      <p className="author">
                        <strong>Author:</strong>{" "}
                        {post.user
                          ? `${post.user.first_name} ${post.user.last_name}`
                          : "Unknown"}
                      </p>
                    </div>
                    <div className="column is-half has-text-right">
                      <button
                        className="button is-link is-small"
                        onClick={handleAddComment}
                      >
                        <FaComment style={{ marginRight: "5px" }} /> Add Comment
                      </button>
                    </div>
                  </div>
                  {post.categories && (
                    <p>
                      <strong>Category:</strong> {post.categories.label}
                    </p>
                  )}
                  {post.content && <p>{post.content}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
