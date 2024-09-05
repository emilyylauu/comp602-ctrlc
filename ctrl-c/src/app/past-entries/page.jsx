"use client";

import React, { useRef, useEffect } from "react";
import "./journal.css";


const Journal = () => {
  const dayRef = useRef();
  const monthRef = useRef();
  const textareaRef = useRef();





  const handleSave = () => {
    const day = Number(dayRef.current.value);
    const month = monthRef.current.value;

    if ((month === "Feb" && day > 29) || 
        (["Apr", "Jun", "Sep", "Nov"].includes(month) && day > 30)) {
      alert('Please enter a valid date');
    } else {
      alert('Entry has been saved!');
    }
  };


  return (
    <div className="journal-container">
      <h2 className="journal-header">My Daily Journal</h2>

      <div className="journal-content">
        {/* Image on the left */}
        <div className="image-container">
          <img src="/images/Unwind_Your_Mind_Play_Journal_Relax.png" width="200" alt="Journal Image" />
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

        <select>
          {[2024, 2025, 2026, 2027, 2028].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Textarea positioned below the image and text */}
      <textarea 
        ref={textareaRef} 
        className="entry-box" 
        placeholder="Type here..."
      ></textarea>

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
