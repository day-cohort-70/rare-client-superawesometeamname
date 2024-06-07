export const createComment = async (newComment) => {
  return await fetch(`http://localhost:8088/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newComment),
  }).then((res) => res.json());
};

export const getCommentsPostById = async (post_id) => {
  return await fetch(`http://localhost:8088/comments/${post_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
