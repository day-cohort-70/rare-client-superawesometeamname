import { useState, useEffect } from "react";
import { getAllCategories } from "../../managers/CategoryManager.jsx";

export const DisplayCategoryManager = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCategories().then(setAllCategories);
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newCategory }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewCategory("");
        getAllCategories().then((data) => setAllCategories(data));
      } else {
        console.error("Error creating Category:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating Category:", error);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2 className="title has-text-centered">Categories</h2>

          {allCategories.map((category) => (
            <div key={category.id} className="columns is-centered">
              <div className="column is-half">
                <div className="box has-text-centered">{category.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-narrow">
          <button
            className="button is-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Tag
          </button>
        </div>
      </div>

      {/* Bulma modal */}
      <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">Create Tag</h2>
            <div className="field">
              <label className="label">Tag Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>
            <button
              className="button is-primary"
              onClick={handleCreateCategory}
            >
              Submit
            </button>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsModalOpen(false)}
        ></button>
      </div>
    </div>
  );
};
