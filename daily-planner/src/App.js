import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  // Create a unique key for today's date in YYYY-MM-DD format
  const todayKey = today.toISOString().split('T')[0];

  const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM to 5 PM

  const [tasks, setTasks] = useState({});

  // EFFECT 1: Load tasks from localStorage when the component mounts
  useEffect(() => {
    // We use todayKey to ensure we only load tasks for the current day
    const savedTasks = localStorage.getItem(todayKey);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [todayKey]); // Re-run if the day changes

  // EFFECT 2: Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    // Only save if tasks object is not empty.
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
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Daily Planner</h1>
        <p>{formattedDate}</p>
      </header>
      <main className="time-slots">
        {workHours.map(hour => (
          <div key={hour} className="time-slot">
            <div className="hour">{hour}:00</div>
            <textarea
              className="task-input"
              value={tasks[hour] || ''}
              onChange={(e) => handleInputChange(hour, e.target.value)}
              placeholder="Add a task..."
            />
            {/* The save button is now more for visual confirmation, as tasks save on type */}
            <button
              className="save-button"
              onClick={() => alert(`Task for ${hour}:00 saved!`)}
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