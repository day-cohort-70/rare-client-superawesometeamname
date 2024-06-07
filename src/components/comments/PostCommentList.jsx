import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsPostById } from "../../managers/CommentManager.jsx";
import { FaRegComment } from "react-icons/fa"; // Import the regular variant of the FaComment icon
import "bulma/css/bulma.min.css";
import "./PostCommentList.css"; // Assuming you have a CSS file for custom styles

export const PostCommentList = () => {
  const { post_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments by post_id when the component mounts
    getCommentsPostById(post_id).then((data) => {
      setComments(data);
    });
  }, [post_id]);

  return (
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          <FaRegComment
            className="outlined-icon"
            style={{ marginRight: "8px", strokeWidth: "2", color: "#4a4a4a" }}
          />
          Comments
        </h4>
        <div className="content">
          {comments.map((comment) => (
            <div key={comment.id} className="box comment-box">
              <p className="is-size-7">{comment.content}</p>{" "}
              {/* Make the comment text smaller */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
