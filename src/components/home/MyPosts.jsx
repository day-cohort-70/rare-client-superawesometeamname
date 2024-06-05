import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../../managers/PostManager.jsx";
import { PostDetail } from "./PostDetail.jsx";
import 'bulma/css/bulma.min.css';  // Make sure to import Bulma if not already done in index.js

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts(token).then((data) => {
      setPosts(data);
    });
  }, [token]);

  const handlePostClick = (postId) => {
    console.log(postId)
    navigate(`/posts/${postId}`);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">My Posts</h1>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          <div className="columns is-multiline">
            {posts.map((post) => (
              <div key={post.id} className="column is-one-third">
                <div className="card" onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{post.title}</p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-content">
                        <p className="is-size-7">Author: {post.user.first_name} {post.user.last_name}</p>
                        <p className="is-size-7">Category: {post.categories.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


