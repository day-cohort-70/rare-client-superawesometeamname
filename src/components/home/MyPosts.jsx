import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../../managers/PostManager.jsx";
<<<<<<< HEAD
import 'bulma/css/bulma.min.css';  // Make sure to import Bulma if not already done in index.js
=======
import { FaPlus } from "react-icons/fa"; // Importing the FaPlus icon from react-icons/fa
import "bulma/css/bulma.min.css"; // Make sure to import Bulma if not already done in index.js
>>>>>>> main

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts(token).then((data) => {
      setPosts(data);
    });
  }, [token]);

  const handlePostClick = (postId) => {
    console.log(postId);
    navigate(`/posts/${postId}`);
  };

  const handleAddPost = () => {
    navigate("/newpost");
  };

  return (
    <section className="section">
      <div className="container">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <h1 className="title">My Posts</h1>
          <button
            className="button"
            onClick={handleAddPost}
            style={{
              backgroundColor: "white",
              border: "none",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="icon" style={{ color: "black" }}>
              <FaPlus />
            </span>
          </button>
        </div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          <div className="columns is-multiline">
            {posts.map((post) => (
              <div key={post.id} className="column is-one-third">
                <div
                  className="card"
                  onClick={() => handlePostClick(post.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{post.title}</p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-content">
                        <p className="is-size-7">
                          Author: {post.user.first_name} {post.user.last_name}
                        </p>
                        <p className="is-size-7">
                          Category: {post.categories.label}
                        </p>
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
