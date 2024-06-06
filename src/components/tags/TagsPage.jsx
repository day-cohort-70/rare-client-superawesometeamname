import { useState, useEffect } from "react";
import { getAllTags } from "../../managers/TagsManager.js";

export const TagsPage = () => {
  const [allTags, setAllTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  const handleCreateTag = async () => {
    try {
      const response = await fetch("http://localhost:8088/Tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newTag }),
      });

      if (response.ok) {
        const createdTag = await response.json();
        setAllTags([...allTags, createdTag]);
        setIsModalOpen(false);
        setNewTag("");
      } else {
        console.error("Error creating tag:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setNewTag(tag.label);
    setIsModalOpen(true);
  };

  const handleUpdateTag = async () => {
    try {
      const response = await fetch(`http://localhost:8088/Tags/${editingTag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newTag }),
      });

      if (response.ok) {
        const updatedTags = allTags.map((tag) =>
          tag.id === editingTag.id ? { ...tag, label: newTag } : tag
        );
        setAllTags(updatedTags);
        setIsModalOpen(false);
        setNewTag("");
        setEditingTag(null);
      } else {
        console.error("Error updating tag:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setNewTag("");
    setEditingTag(null);
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2 className="title has-text-centered">Tags</h2>
          {allTags.map((tag) => (
            <div key={tag.id} className="columns is-centered">
              <div className="column is-half">
                <div className="box">
                  <div className="columns is-vcentered">
                    <div className="column">{tag.label}</div>
                    <div className="column is-narrow">
                      <button
                        className="button is-small is-info"
                        onClick={() => handleEditTag(tag)}
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
            Create Tag
          </button>
        </div>
      </div>

      <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">
              {editingTag ? "Edit Tag" : "Create Tag"}
            </h2>
            <div className="field">
              <label className="label">Tag Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </div>
            </div>
            <button
              className="button is-primary"
              onClick={editingTag ? handleUpdateTag : handleCreateTag}
            >
              {editingTag ? "Update" : "Submit"}
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