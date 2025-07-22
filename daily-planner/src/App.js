import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  // Create a unique key for today's date in YYYY-MM-DD format
  const todayKey = today.toISOString().split('T')[0];

  // The workHours array still uses 24-hour format for logic
  const workHours = [6,7,8,9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20,21]; // 9 AM to 5 PM

  const [tasks, setTasks] = useState({});

  // EFFECT 1: Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem(todayKey);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [todayKey]); // Re-run if the day changes

  // EFFECT 2: Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem(todayKey, JSON.stringify(tasks));
    }
  }, [tasks, todayKey]);

  // Handle changes in any textarea
  const handleInputChange = (hour, text) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [hour]: text,
    }));
  };

  // --- CHANGE 1: Helper function to format the time ---
  // This function converts a 24-hour number into a 12-hour string (e.g., 13 -> "1 PM")
  const formatHour12 = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    // Convert 24-hour time to 12-hour.
    // The modulo (%) handles hours 13-23.
    // The `|| 12` handles the case for 12 PM (12 % 12 is 0).
    const displayHour = hour % 12 || 12;

    return `${displayHour} ${ampm}`;
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Daily Planner</h1>
        <p>{formattedDate}</p>
      </header>
      <main className="time-slots">
        {workHours.map(hour => (
          <div key={hour} className="time-slot">
            {/* --- CHANGE 2: Use the formatting function for display --- */}
            <div className="hour">{formatHour12(hour)}</div>
            <textarea
              className="task-input"
              value={tasks[hour] || ''}
              onChange={(e) => handleInputChange(hour, e.target.value)}
              placeholder="Add a task..."
            />
            <button
              className="save-button"
              /* --- CHANGE 3: Also update the alert message for consistency --- */
              onClick={() => alert(`Task for ${formatHour12(hour)} saved!`)}
            >
              ✓
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;