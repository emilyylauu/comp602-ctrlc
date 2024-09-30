'use client'; // This directive is specific to Next.js and enables client-side rendering for this component.

import { db } from '../firebase/firebaseConfig'; // Import Firebase configuration
import React, { useState, useRef } from "react";
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions for interacting with the database.
import "./newEntry.css"; // Import CSS styles specific to the New Entry component.

// Function to add data to Firestore database
async function addDataToFireStore(category, title, day, month, year, entry) {
  try {
    // Add a new document to the "messages" collection in Firestore
    const docRef = await addDoc(collection(db, "messages"), {
      category: category, // Store category value
      title: title,       // Store the title of the entry
      day: day,           // Store day value
      month: month,       // Store month value
      year: year,         // Store year value
      entry: entry,       // Store the journal entry text
    });

    console.log("Document written with ID: ", docRef.id);
    return true; // Return true if document addition was successful
  } catch (error) {
    console.error("Error adding document: ", error);
    return false; // Return false if there was an error
  }
}

const NewEntry = () => {
  // References to the HTML elements for user input
  const dayRef = useRef();     // Ref for day selection
  const monthRef = useRef();   // Ref for month selection
  const yearRef = useRef();    // Ref for year selection
  const titleRef = useRef();   // Ref for journal entry title input
  const entryRef = useRef();   // Ref for journal entry textarea

  // State to track the selected category and whether the form should be displayed
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [showForm, setShowForm] = useState(false); // Track whether to show the form

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set the selected category
    setShowForm(true); // Show the form after category selection
  };

  // Function to handle saving the journal entry
  const handleSave = async () => {
    // Retrieve values from input fields using refs
    const title = titleRef.current.value;     // Get the title of the entry
    const day = Number(dayRef.current.value); // Convert day value to a number
    const month = monthRef.current.value;     // Get month value as a string
    const year = Number(yearRef.current.value); // Convert year value to a number
    const entry = entryRef.current.value;     // Get the journal entry text

    // Validate the date input to ensure it matches the month's possible days
    if ((month === "Feb" && day > 29) ||  // Check for invalid days in February
        (["Apr", "Jun", "Sep", "Nov"].includes(month) && day > 30)) { // Check for months with 30 days
      alert('Please enter a valid date'); // Alert the user if the date is invalid
      return; // Exit the function if the date is invalid
    }

    // Call function to save entry to Firestore and check if it was successful
    const success = await addDataToFireStore(selectedCategory, title, day, month, year, entry);

    // Provide user feedback based on the success of the operation
    if (success) {
      alert('Entry has been saved!'); // Notify user of successful save
    } else {
      alert('Failed to save entry. Please try again.'); // Notify user of a failure
    }
  };

  return (
    <div className="new-entry-container"> {/* Main container for the new-entry component */}
      {!showForm ? ( // If the form is not yet shown, display the category selection
        <>
          <h2 className="new-entry-header">What is this entry about?</h2> {/* Header for category selection */}
          <div className="category-container">
            <button className="category-button" onClick={() => handleCategorySelect("Shopping List")}>
              <img src="/images/bag.png" width="35" alt="Shopping Bag Icon"/>Shopping List
            </button>

            <button className="category-button" onClick={() => handleCategorySelect("spending log")}>
              <img src="/images/money.png" width="35" alt="Money Icon"/>
              Spending Log
            </button>
            <button className="category-button" onClick={() => handleCategorySelect("Emotion")}>
              <img src="/images/emoji-face.png" width="35" alt="Emotion Icon"/>
              Emotion
            </button>
            <button className="category-button" onClick={() => handleCategorySelect("To-Do List")}>
              <img src="/images/requirements.png" width="35" alt="To-Do List Icon"/>
              To-Do List
            </button>
            <button className="category-button" onClick={() => handleCategorySelect("Custom")}>
              Other
            </button>
          </div>
        </>
      ) : ( // Show the form once a category is selected
        <>
          <h2 className="new-entry-header">New {selectedCategory} Entry</h2> {/* Display selected category in header */}

          {/* Container for date selectors */}
          <div className="date-container">
            <select ref={dayRef}> {/* Dropdown for selecting the day */}
              {[...Array(31).keys()].map(i => ( // Generate options for days 1 through 31
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select ref={monthRef}> {/* Dropdown for selecting the month */}
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                <option key={month} value={month}>{month}</option> // Generate options for each month
              ))}
            </select>

            <select ref={yearRef}> {/* Dropdown for selecting the year */}
              {[2024, 2025, 2026, 2027, 2028].map(year => (
                <option key={year} value={year}>{year}</option> // Generate options for years from 2024 to 2028
              ))}
            </select>
          </div>

          {/* Input field for entering the title */}
          <input 
            ref={titleRef} 
            type="text" 
            placeholder="Title" 
            className="title-input" 
          />

          {/* Textarea for entering the journal entry text */}
          <textarea 
            ref={entryRef} 
            placeholder="Type here..." 
            className="entry-textarea"
          ></textarea>

          {/* Container for the action buttons */}
          <div className="button-container">
            <button className="button" onClick={handleSave}>Save Entry</button> {/* Button to save the current journal entry */}
            <a href="/journal">
              <button className="button">Back</button> {/* Button linking back to the journal page */}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default NewEntry;
