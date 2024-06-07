import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { createComment } from "../../managers/CommentManager.jsx";

export const CreateComment = ({ token }) => {
  const { post_id } = useParams();
  const contentRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id,
      author_id: token, // Assume the token is the user ID
      content: contentRef.current.value,
    };
    try {
      await createComment(newComment);
      // Redirect to post comment list after successful comment creation
      navigate(`/comments/${post_id}`);
    } catch (error) {
      console.error("Failed to create comment:", error.message);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <h1 className="title is-4 has-text-centered">Add a Comment</h1>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        ref={contentRef}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button className="button is-link" type="submit">
                        Submit
                      </button>
                    </div>
                    <div className="control">
                      <button
                        className="button is-light"
                        type="button"
                        onClick={() => navigate(`/posts/${post_id}`)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
