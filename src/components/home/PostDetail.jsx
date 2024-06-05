import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager.jsx";
import "bulma/css/bulma.min.css";

export const PostDetail = ({ token }) => {
  const { post_id } = useParams(); // Ensure you are getting postId correctly
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  if (!post) {
    return <p>Loading...</p>;
  }

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
                  <p>
                    <strong>Author:</strong>{" "}
                    {post.user
                      ? `${post.user.first_name} ${post.user.last_name}`
                      : "Unknown"}
                  </p>
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
