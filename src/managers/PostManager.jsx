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


export const createACategory = (CatData) =>{
  return fetch(`http://localhost:8088/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(CatData),
  })
}

export const getAllCategories = () =>{
  return fetch("http://localhost:8088/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify()
  }).then(res => res.json())
}


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

