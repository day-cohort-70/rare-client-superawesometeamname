export const createACategory = (CatData) => {
  return fetch(`http://localhost:8088/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(CatData),
  });
};

export const getAllCategories = () => {
  return fetch("http://localhost:8088/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then((res) => res.json());
};

//.then((res) => res.json());
