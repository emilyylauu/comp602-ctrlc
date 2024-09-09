'use client'

import { db } from '../firebase/firebaseConfig'; // Navigate up one level, then into firebase


import React, { useRef, useEffect } from "react";
import { collection, addDoc } from 'firebase/firestore'
import "./journal.css";

// Corrected function to add data to Firestore
async function addDataToFireStore(day, month, year, entry) {
  try {
    console.log('Attempting to add document:', { day, month, year, entry });
    const docRef = await addDoc(collection(db, "messages"), {
      day: day,
      month: month,
      year: year,
      entry: entry,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}


const Journal = () => {
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef(); // Ref for year selection
  const entryRef = useRef(); // Ref for textarea entry

  const handleSave = async () => {
    const day = Number(dayRef.current.value);
    const month = monthRef.current.value;
    const year = Number(yearRef.current.value);
    const entry = entryRef.current.value;

    // Validate date input
    if ((month === "Feb" && day > 29) ||
        (["Apr", "Jun", "Sep", "Nov"].includes(month) && day > 30)) {
      alert('Please enter a valid date');
      return;
    }

    // Save entry to Firestore
    const success = await addDataToFireStore(day, month, year, entry);

    if (success) {
      alert('Entry has been saved!');
    } else {
      alert('Failed to save entry. Please try again.');
    }
  };

  return (
    <div className="journal-container">
      <h2 className="journal-header">My Daily Journal</h2>

      <div className="journal-content">
        {/* Image on the left */}
        <div className="image-container">
          <img src="/images/distraction.png" width="270" alt="Journal Image" />
        </div>
        
        {/* Paragraph on the right */}
        <div className="text-container">
          <p>Please use this space to express your feelings, successes, or simply jot down the little things that bring you joy. Start off by entering the date and use this as an opportunity to pause, breathe, and be honest with yourself—no matter what you’re going through.
          </p>
        </div>
      </div>

      {/* Date selectors */}
      <div className="date-container">
        <select ref={dayRef}>
          {[...Array(31).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <select ref={monthRef}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <select ref={yearRef}>
          {[2024, 2025, 2026, 2027, 2028].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Textarea positioned below the image and text */}
      <textarea ref={entryRef} placeholder="Type here..."></textarea>

      <div className="button-container">
        <a href="/past-entries">
          <button className="button">Past Entries</button>
        </a>

        <button className="button" onClick={handleSave}>Save</button>

        <a href="/home-page">
          <button className="button">Back to Homepage</button>
        </a>
      </div>
    </div>
  );
};

export default Journal;
