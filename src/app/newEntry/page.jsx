'use client'; // Ensure client-side rendering

import { db } from "../(component)/Firebase/firebase";
import React, { useState, useRef } from "react";
import { collection, addDoc } from 'firebase/firestore';
import NavBar from "../(component)/NavBar/navbar"; 
import "./newEntry.css"; // Import styles

async function addDataToFireStore(category, title, day, month, year, entry) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      category,
      title,
      day,
      month,
      year,
      entry,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

const NewEntry = () => {
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const titleRef = useRef();
  const entryRef = useRef();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleSave = async () => {
    const title = titleRef.current.value;
    const day = Number(dayRef.current.value);
    const month = monthRef.current.value;
    const year = Number(yearRef.current.value);
    const entry = entryRef.current.value;

    if ((month === "Feb" && day > 29) || (["Apr", "Jun", "Sep", "Nov"].includes(month) && day > 30)) {
      alert('Please enter a valid date');
      return;
    }

    const success = await addDataToFireStore(selectedCategory, title, day, month, year, entry);

    if (success) {
      alert('Entry has been saved!');
    } else {
      alert('Failed to save entry. Please try again.');
    }
  };

  return (
    <>
      <NavBar />
      {showForm ? (
        <form>
          <input ref={titleRef} type="text" placeholder="Title" />
          <input ref={dayRef} type="number" placeholder="Day" />
          <input ref={monthRef} type="text" placeholder="Month" />
          <input ref={yearRef} type="number" placeholder="Year" />
          <textarea ref={entryRef} placeholder="Your journal entry"></textarea>
          <button type="button" onClick={handleSave}>Save</button>
        </form>
      ) : (
        <div>
          <button onClick={() => handleCategorySelect('Work')}>Select Work</button>
          <button onClick={() => handleCategorySelect('Personal')}>Select Personal</button>
        </div>
      )}
    </>
  );
};

export default NewEntry;
