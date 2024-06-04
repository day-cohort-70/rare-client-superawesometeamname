import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostManager"; // Adjust the path as needed
import "bulma/css/bulma.min.css";

export const AdminHome = () => {
  const [posts, setPosts] = useState([]);

  /*useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  if (!posts.length) {
    return <div>Loading...</div>;
  }*/

  return (
    <div className="container">
      {posts.map((post) => (
        <div className="card" key={post.id} style={{ marginBottom: "20px" }}>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{post.title}</p>
              </div>
              <div className="media-right">
                <p className="subtitle is-6">
                  {new Date(post.publication_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="content has-text-centered">
              <figure className="image is-3by1">
                <img src={post.image_url} alt="Post image" />
              </figure>
              <div className="media">
                <div className="media-left">
                  <p className="subtitle is-6">Author: {post.user_id}</p>
                </div>
                <div className="media-right">
                  <p className="subtitle is-6">
                    Reactions: {post.reaction_count}
                  </p>
                </div>
              </div>
              <div className="content">
                <p>{post.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
