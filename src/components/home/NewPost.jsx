import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/PostManager"; // Adjust the path as needed
import { getAllCategories } from "../../managers/CategoryManager.jsx";
import { getAllTags } from "../../managers/TagsManager.js";

export const NewPost = ({ token }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const tagRefs = useRef({}); //tagRefs.current is an object where each key is the ID of a tag, and the value is the reference to the checkbox input element for that tag.
  const imageRef = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
    getAllTags().then(setTags);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTags = Object.keys(tagRefs.current) //This retrieves an array of all the keys (IDs) of the tagRefs object. Each key corresponds to the ID of a tag.
      .filter((key) => tagRefs.current[key].checked) //This filters the keys based on whether the corresponding checkbox is checked. It checks each checkbox reference stored in tagRefs.current (using the keys) and returns only the keys where the checkbox is checked.
      .map((key) => parseInt(key)); //This maps the filtered keys (which represent the IDs of the checked tags) into an array of integers (tag IDs). The parseInt function is used to convert each key (which is a string) into an integer.

    const newPost = {
      user_id: token, // Use the token as the user_id
      category_id: categoryRef.current.value,
      title: titleRef.current.value,
      publication_date: new Date().toISOString(), // Use current time
      image_url: imageRef.current.value,
      content: contentRef.current.value,
      approved: true,
      tag_ids: selectedTags, //array of tags that are checked
    };

    createPost(newPost).then((response) => {
      console.log(response);
      const postId = response.token;
      // Clear the form fields
      titleRef.current.value = "";
      imageRef.current.value = "";
      contentRef.current.value = "";
      categoryRef.current.value = "";
      Object.values(tagRefs.current).forEach(
        //re-sets all values to false
        (checkbox) => (checkbox.checked = false)
      );

      // Redirect to homepage after successful post creation
      navigate(`/posts/${postId}`);
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
            <input className="input" type="text" ref={titleRef} required />
          </div>
        </div>

        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input className="input" type="text" ref={imageRef} />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea className="textarea" ref={contentRef} required></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select ref={categoryRef} required>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Tags</label>
          <div className="control">
            <div className="tags">
              {tags.map((tag) => (
                <label key={tag.id} className="tag">
                  <input
                    type="checkbox"
                    ref={(el) => (tagRefs.current[tag.id] = el)} //This line creates an input element of type checkbox. It allows users to select or deselect a tag. The ref attribute is used to store a reference to each checkbox element in the tagRefs object, allowing access to them later. The value attribute is set to the id of the tag.
                    value={tag.id}
                  />
                  <span style={{ marginLeft: "5px" }}>{tag.label}</span>
                </label>
              ))}
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
