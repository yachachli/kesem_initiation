import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import moment from 'moment-timezone';




// Home component
function Home() {
  const [riddlesState, setRiddlesState] = useState({
    riddle1: { countdown: '', text: 'This is riddle 1' },
    riddle2: { countdown: '', text: 'This is riddle 2' },
    riddle3: { countdown: '', text: 'This is riddle 3' },
    riddle4: { countdown: '', text: 'This is riddle 4' },
  });

  const riddleTimes = {
    riddle1: moment.tz('2024-02-02 18:30', 'America/Los_Angeles'),
    riddle2: moment.tz('2024-02-02 19:00', 'America/Los_Angeles'),
    riddle3: moment.tz('2024-02-02 19:30', 'America/Los_Angeles'),
    riddle4: moment.tz('2024-02-02 20:00', 'America/Los_Angeles')
  };

  const calculateCountdown = () => {
    let newRiddlesState = { ...riddlesState };
    const now = moment();

    Object.entries(riddleTimes).forEach(([key, time]) => {
      let duration = moment.duration(time.diff(now));
      if (duration.asSeconds() <= 0) {
        newRiddlesState[key].countdown = ''; // Clear the countdown
      } else {
        newRiddlesState[key].countdown = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
      }
    });

    setRiddlesState(newRiddlesState);
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inner-container">
      <h1>Welcome to the KESEM INITIATION 2024!</h1>
      <p className="explainer-text">
      Hello and welcome to Kesem initiation 2024! Below you will find 4 countdowns that will each reveal a riddle to a location you must drive to and complete a certain activity at. Once at the location, send Chicken Joe (408-881-2093) proof of your group doing the activity. Additionally, if you have time between locations, you can complete any item in the 'scavenger hunt' section to get extra points (must send proof to CJ). Feel free to text Chicken Joe if you have any questions! HAVE FUN, BE SAFE, AND GOOD LUCK  &lt;3
      </p>
      {Object.entries(riddlesState).map(([key, { countdown, text }]) => (
        <div key={key} className="riddle-container">
          <p className={countdown ? 'countdown' : 'riddle'}>
            {key.replace('riddle', 'Location riddle ')}: {countdown || text}
          </p>
        </div>
      ))}
    </div>
  );
}

// ScavengerHuntList component
function ScavengerHuntList() {
  const items = ['item 1', 'item 2', 'item 3']; // Add more items as needed
  return (
    <div className="inner-container">
      <h2>Scavenger Hunt List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// App component with routing
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/scavenger-hunt-list" className={({ isActive }) => isActive ? "active" : ""}>Scavenger Hunt List</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/scavenger-hunt-list" element={<ScavengerHuntList />} />
          <Route path="/home" element={<Home />} />
          {/* Redirect all other paths to /home */}
          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
