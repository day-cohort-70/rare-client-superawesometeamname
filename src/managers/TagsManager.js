
export const getAllTags = () => {
    return fetch("http://localhost:8088/Tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify()
    }).then(res => res.json())
  }
