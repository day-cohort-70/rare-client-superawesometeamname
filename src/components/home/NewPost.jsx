import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/PostManager"; // Adjust the path as needed

export const NewPost = ({ token }) => {
  const title = useRef();
  const imageUrl = useRef();
  const content = useRef();
  const category = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    // In this example, we'll use a static array of categories instead
    const categoriesData = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
    ];
    setCategories(categoriesData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      user_id: token, // Use the token as the user_id
      category_id: category.current.value,
      title: title.current.value,
      publication_date: new Date().toISOString(), // Use current time
      image_url: imageUrl.current.value,
      content: content.current.value,
      approved: true,
    };

    createPost(newPost).then(() => {
      // Clear the form fields
      title.current.value = "";
      imageUrl.current.value = "";
      content.current.value = "";
      category.current.value = "";

      // Redirect to homepage after successful post creation
      navigate("/");
    });
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSubmit}>
        <h4 className="title">New Post</h4>
        <p className="subtitle"></p>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" ref={title} required />
          </div>
        </div>

        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input className="input" type="text" ref={imageUrl} />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea className="textarea" ref={content} required></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select ref={category} required>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Publish
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

/*import { useState, useEffect } from "react";
import { getUserPosts } from "../../managers/PostManager.jsx";

export const AdminHome = (token = { token }, setToken = { setToken }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    //get all posts
    getUserPosts(token).then((data) => {
      setUserPosts(data);
    });
  }, [userPosts]);

  return (
    <div className="container">
      <h2>Hello</h2>
      
      {userPosts.map((post) => (
        <div key={post.id} className="card">
          <div className="card-content">
            <p className="title is-4">{post.title}</p>
            <p className="subtitle is-6 has-text-right">
              {post.publication_date}
            </p>
          </div>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={post.image_url} alt="Post" />
            </figure>
          </div>
          <div className="card-content">
            <p className="subtitle is-6">Author: {post.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};*/
