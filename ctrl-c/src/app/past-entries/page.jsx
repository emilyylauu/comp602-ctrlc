"use client"; // This directive makes the component a Client Component

import "./pastEntries.css"; 
import React, { useState, useEffect } from "react";

const PastEntries = () => {
  const [entries, setEntries] = useState([]);

  // Handle change of entry content
  const handleChange = (id, newContent) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, content: newContent } : entry
      )
    );
  };
  
  // Handle edit mode toggle
  const handleEditToggle = (id) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
      )
    );
  };

  // Handle delete actions
  const handleDelete = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    alert(`Are you sure you want to delete this entry?`); 
  };

  return (
    <div className="past-entries-container">
      <h1 className="past-entries-header">Past Entries</h1>

      <div className="display-container">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <p className="display">Date: {entry.date}</p>
            {entry.isEditing ? (
              <textarea 
                className="edit-textarea" 
                value={entry.content} 
                onChange={(e) => handleChange(entry.id, e.target.value)} 
              />
            ) : (
              <p className="display">{entry.content}</p>
            )}
            <div className="button-group">
              {entry.isEditing ? (
                <button 
                  className="button save-button"
                  onClick={() => handleEditToggle(entry.id)}> Save </button>
              ) : (
                <button 
                  className="button edit-button"
                  onClick={() => handleEditToggle(entry.id)}> Edit</button>
              )}
              <button 
                className="button delete-button" 
                onClick={() => handleDelete(entry.id)}>Delete </button>
            </div>
          </div>
        ))}
      </div>

      <a href="/journal">
        <button className="button">Back to Journal</button>
      </a>
    </div>
  );
};

export default PastEntries;