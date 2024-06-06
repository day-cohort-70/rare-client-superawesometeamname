import { useState, useEffect } from "react";
import { getAllCategories } from "../../managers/CategoryManager.jsx";

export const DisplayCategoryManager = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
        const createdCategory = await response.json();
        setAllCategories([...allCategories, createdCategory]);
        setIsModalOpen(false);
        setNewCategory("");
      } else {
        console.error("Error creating category:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category.label);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8088/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newCategory }),
        
      });
      
      if (response.ok) {
        const updatedCategories = allCategories.map((category) =>
          category.id === editingCategory.id ? { ...category, label: newCategory } : category
        );
        setAllCategories(updatedCategories);
        setIsModalOpen(false);
        setNewCategory("");
        setEditingCategory(null);
      } else {
        console.error("Error updating category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error)
      console.log(editingCategory);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setNewCategory("");
    setEditingCategory(null);
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2 className="title has-text-centered">Categories</h2>
          {allCategories.map((category) => (
            <div key={category.id} className="columns is-centered">
              <div className="column is-half">
                <div className="box">
                  <div className="columns is-vcentered">
                    <div className="column">{category.label}</div>
                    <div className="column is-narrow">
                      <button
                        className="button is-small is-info"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
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
            Create Category
          </button>
        </div>
      </div>

      <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h2>
            <div className="field">
              <label className="label">Category Name</label>
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
              onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
            >
              {editingCategory ? "Update" : "Submit"}
            </button>
            <button
              className="button is-danger ml-2"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleCancelEdit}
        ></button>
      </div>
    </div>
  );
};
