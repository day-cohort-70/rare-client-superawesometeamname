import { useState, useEffect } from "react"
import { getAllTags } from "../../managers/TagsManager.js";

export const TagsPage = () => {
  const [allTags, setAllTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getAllTags().then(setAllTags)
  }, [])

  // Function to handle creating a new tag
  const handleCreateTag = async () => {
    try {
      const response = await fetch("http://localhost:8088/Tags", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label: newTag }),
      });

      if (response.ok) {
        const createdTag = await response.json();
        setAllTags([...allTags, { ...createdTag, label: newTag }]);
        setIsModalOpen(false);
        setNewTag('');
      } else {
        console.error('Error creating tag:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };
    
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2 className="title has-text-centered">Tags</h2>
          {/* Render tags */}
          {allTags.map((tag) => (
            <div key={tag.id} className="columns is-centered">
              <div className="column is-half">
                <div className="box has-text-centered">
                  {tag.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Tag button */}
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
      <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
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
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </div>
            </div>
            <button
              className="button is-primary"
              onClick={handleCreateTag}
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