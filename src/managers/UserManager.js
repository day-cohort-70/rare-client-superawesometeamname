
export const getAllUsers = () => {
    return fetch("http://localhost:8088/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify()
    }).then(res => res.json())
  }