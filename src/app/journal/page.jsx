'use client';

import React from "react";
import "./journal.css"; // Import CSS styles specific to the Journal component.

const Journal = () => {
  return (
    <div className="journal-container"> {/* Main container for the journal component */}
      <h2 className="journal-header">My Daily Journal</h2> {/* Header for the journal */}

      <div className="journal-content">
        {/* Container for the image on the left */}
        <div className="image-container">
          <img src="/images/distraction.png" width="270" alt="Journal Image" /> {/* Journal related image */}
        </div>
        
        {/* Container for the descriptive text on the right */}
        <div className="text-container">
          <p>
            Please use this space to express your feelings, successes, or simply jot down the little things that bring you joy. 
          </p>
          <p>Click "+" for new entry</p>

          {/* Wrapper for paw image and + icon */}
          <div className="icon-wrapper">
            <a href="/newEntry" className="plus-link">
              <div className="plus-icon">+</div> {/* Plus icon as a link */}
            </a>
            <img src="/images/paw.png"  alt="Paw Icon" /> {/* Paw icon */}
          </div>
        </div>
      </div>

      {/* Container for the navigation buttons */}
      <div className="button-container">
        <a href="/past-entries">
          <button className="button">Past Entries</button> {/* Button linking to past entries page */}
        </a>

        <a href="/">
          <button className="button">Back to Homepage</button> {/* Button linking back to the homepage */}
          
        </a>
      </div>
    </div>
  );
};

export default Journal;
