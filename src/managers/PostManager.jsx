export const createPost = (newPost) => {
  return fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newPost),
  });
};
//.then((res) => res.json());

export const getUserPosts = async (token) => {
  return await fetch(
    `http://localhost:8088/posts?user_id=${token}&expand=user&expand=categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());
};

export const getPostById = async (post_id) => {
  return await fetch(`http://localhost:8088/posts/${post_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
