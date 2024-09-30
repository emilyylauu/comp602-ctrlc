"use client";

import { db } from '../firebase/firebaseConfig'; 
import "./pastEntries.css";
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from "react";

const PastEntries = () => {
  const [entries, setEntries] = useState([]);

  // Fetch entries from Firestore when the component loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const snapshot = await getDocs(collection(db, "messages"));
        const entriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEntries(entriesList);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  // Toggle edit mode for an entry
  const toggleEdit = (id) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
    ));
  };

  // Update entry content in state and Firestore
  const updateEntry = async (id, newContent, newTitle) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, entry: newContent, title: newTitle } : entry
    ));

    // Update Firestore with the new content and title
    try {
      await updateDoc(doc(db, "messages", id), { entry: newContent, title: newTitle });
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  // Delete an entry from state and Firestore
  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    setEntries(entries.filter(entry => entry.id !== id));

    // Delete entry from Firestore
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Share entry content with date, title, and category
  const shareEntry = (entryDate, title, category, entryContent) => {
    const contentToShare = `Category: ${category}\nTitle: ${title}\nDate: ${entryDate}\n\n${entryContent}`; // Combine date, title, category, and entry content

    if (navigator.share) {
      // If Web Share API is supported
      navigator.share({
        title: 'Journal Entry',
        text: contentToShare,
      })
      .then(() => console.log('Entry shared successfully!'))
      .catch((error) => console.error('Error sharing entry:', error));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(contentToShare)
        .then(() => alert('Entry copied to clipboard!'))
        .catch((error) => console.error('Error copying to clipboard:', error));
    }
  };

  return (
    <div className="past-entries-container">
      <h1>Past Entries</h1>
      <div className="display-container">
        {entries.map(entry => (
          <div key={entry.id} className="entry-item">
            <p>Category: {entry.category}</p> {/* Display the category */}
            {entry.isEditing ? (
              <input 
                type="text"
                value={entry.title} 
                onChange={(e) => updateEntry(entry.id, entry.entry, e.target.value)} 
              />
            ) : (
              <h3>{entry.title}</h3> // Display the title
            )}
            <p>Date: {entry.day} {entry.month}, {entry.year}</p>
            {entry.isEditing ? (
              <textarea 
                value={entry.entry} 
                onChange={(e) => updateEntry(entry.id, e.target.value, entry.title)} 
              />
            ) : (
              <p>{entry.entry}</p>
            )}
            <div className="button-group">
              <button onClick={() => toggleEdit(entry.id)}>{entry.isEditing ? "Save" : "Edit"}</button>
              <button onClick={() => deleteEntry(entry.id)}>Delete</button>
              <span class="icon icon-heart-empty"></span>
              <button 
                onClick={() => shareEntry(`${entry.day} ${entry.month}, ${entry.year}`, entry.title, entry.category, entry.entry)}
              >
                Share
              </button> {/* Share Button */}
            </div>
          </div>
        ))}
      </div>
      <a href="/journal">
        <button>Back to Journal</button>
      </a>
    </div>
  );
};

export default PastEntries;
