import React from "react";
import { useState, useEffect } from "react";
import { getUserPosts } from "../../managers/PostManager.jsx";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(token).then((data) => {
      setPosts(data);
    });
  }, [token]);

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
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4" style={{ float: "left" }}>
                          {post.title}
                        </p>
                        <p className="is-size-7" style={{ float: "right" }}>
                          {new Date(post.publication_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {post.image_url && (
                      <div className="content has-text-centered">
                        <figure
                          className="image is-4by3"
                          style={{ margin: "auto" }}
                        >
                          <img src={post.image_url} alt={post.title} />
                        </figure>
                      </div>
                    )}
                    <div className="media">
                      <div className="media-content">
                        <p className="is-size-7" style={{ float: "left" }}>
                          Author: {post.user.first_name} {post.user.last_name}
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
