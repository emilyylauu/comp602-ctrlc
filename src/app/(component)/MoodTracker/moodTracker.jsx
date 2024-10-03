"use client"; // Add this at the top of the file

import React, { useState, useEffect } from 'react';
import styles from "@/app/(component)/moodTracker/moodTracker.module.css";
import { db } from '../Firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';


const moodOptions = [
  { name: 'Great', img: './mood_images/great.png' },
  { name: 'Happy', img: './mood_images/happy.png' },
  { name: 'Neutral', img: './mood_images/neutral.png' },
  { name: 'Sad', img: './mood_images/sad.png' },
  { name: 'Angry', img: './mood_images/angry.png' },
  { name: 'Worried', img: './mood_images/worried.png' }
];

// Helper function to format timestamp
const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const [timeFrame, setTimeFrame] = useState('Today');

  // Load mood history from Firestore
  useEffect(() => {
    const loadMoodHistory = async () => {
      const querySnapshot = await getDocs(collection(db, "moodHistory"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMoodHistory(data);
    };
    loadMoodHistory();
  }, []);

  // Save selected mood to Firestore
  const handleMoodSelect = async (moodName) => {
    setSelectedMood(moodName);
    const newMoodEntry = { mood: moodName, timestamp: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "moodHistory"), newMoodEntry);
    setMoodHistory([...moodHistory, { ...newMoodEntry, id: docRef.id }]);
  };

  // Delete a mood entry
  const handleDeleteMood = async (id) => {
    await deleteDoc(doc(db, "moodHistory", id));
    setMoodHistory(moodHistory.filter((entry) => entry.id !== id));
  };

  // Filter mood history based on time frame
  const filterMoodHistory = () => moodHistory.filter((entry) => {
    const now = new Date();
    const entryDate = new Date(entry.timestamp);
    if (timeFrame === 'Today') return entryDate.toDateString() === now.toDateString();
    if (timeFrame === 'Last 7 Days') return now - entryDate <= 7 * 24 * 60 * 60 * 1000;
    if (timeFrame === 'Last 30 Days') return now - entryDate <= 30 * 24 * 60 * 60 * 1000;
    return true;
  });

  // Calculate insights based on filtered history
  const calculateInsights = () => {
    const filteredHistory = filterMoodHistory();
    const moodCount = filteredHistory.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    const mostFrequentMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b, '');

    return { totalEntries: filteredHistory.length, mostFrequentMood, moodCount, filteredHistory };
  };

  const insights = calculateInsights();

  return (
    <div className={styles.moodTrackerContainer}>
      {!showInsights ? (
        <>
          <h2>Select Your Mood</h2>
          <div className={styles.moodGrid}>
            {moodOptions.map((mood, index) => (
              <div key={index} className={styles.moodOption} onClick={() => handleMoodSelect(mood.name)}>
                <img src={mood.img} alt={mood.name} className={styles.moodImage} />
                <p>{mood.name}</p>
              </div>
            ))}
          </div>
          {selectedMood && <div>You are feeling: {selectedMood}</div>}
          <button onClick={() => setShowInsights(true)}>Show Insights</button>
        </>
      ) : (
        <div className={styles.insightsContainer}>
          <h3>Mood Insights</h3>
          <div>
            <label>Sort by:</label>
            <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          {insights.totalEntries > 0 ? (
            <>
              <p>Total Entries: {insights.totalEntries}</p>
              <p>Most Frequent Mood: {insights.mostFrequentMood}</p>
              <ul>{insights.filteredHistory.map((entry) => (<li key={entry.id}>
                    {entry.mood}: {formatTimestamp(entry.timestamp)}{' '}
                    <button onClick={() => handleDeleteMood(entry.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </>
          ) : <p>No entries available.</p>}
          <button onClick={() => setShowInsights(false)}>Back to Mood Tracker</button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
