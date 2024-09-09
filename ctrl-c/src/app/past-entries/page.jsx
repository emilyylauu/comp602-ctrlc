"use client";

import { db } from '../firebase/firebaseConfig'; // Navigate up one level, then into firebase

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
  const updateEntry = async (id, newContent) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, entry: newContent } : entry
    ));

    // Update Firestore with the new content
    try {
      await updateDoc(doc(db, "messages", id), { entry: newContent });
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

  return (
    <div className="past-entries-container">
      <h1>Past Entries</h1>
      <div className="display-container">
        {entries.map(entry => (
          <div key={entry.id} className="entry-item">
            <p>Date: {entry.day} {entry.month}, {entry.year}</p>
            {entry.isEditing ? (
              <textarea value={entry.entry} onChange={(e) => updateEntry(entry.id, e.target.value)} />
            ) : (
              <p>{entry.entry}</p>
            )}
            <button onClick={() => toggleEdit(entry.id)}>{entry.isEditing ? "Save" : "Edit"}</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
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
