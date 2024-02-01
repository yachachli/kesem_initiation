import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import moment from 'moment-timezone';

// Home component
function Home() {
  const [riddlesState, setRiddlesState] = useState({
    location1: {
      riddle1: { countdown: '', text: "In the kitchen, I'm a vessel, round and deep, Stir and toss, in me your secrets keep. If you read it backwards, there's your clue, For sizzling feasts and stir-fries too" },
      riddle2: { countdown: '', text: "In meadows green, I'm often found, Grazing, roaming, all around. With spots or stripes, in tales I bow, Guess who I am, I dare you now." },
      activity: "Activity here: Send a video of your returners doing a thumb war at this location"
    },
    location2: {
      riddle1: { countdown: '', text: "A silent saga, color's weave, Where eyes roam, and thoughts conceive. Held in place, yet worlds unfold, In strokes bold, my tale is told." },
      riddle2: { countdown: '', text: "On walls, vast stories unfold in hue, A canvas grand, where art speaks true." },
      activity: "Activity here: Do a group dance at this location (I'm a fan of the chicken dance)"
    },
    location3: {
      riddle1: { countdown: '', text: "A keeper of treasures, both old and new, Behind my door, a hidden view. Silent and sturdy, I guard what's inside, A box of goodies, in me they confide" },
      riddle2: { countdown: '', text: "A newbie took my name, oh how fun, but i'm still used, under the sun (no need to actually go inside, the gate is chill)" },
      activity: "Activity here: Take a video of your returner saying 3 things they like about each returner in your group"
    },
    location4: {
      riddle1: { countdown: '', text: "I'm the count of parts, hidden inside, In every human, a white resides. Not more, not less, in everyone found, The total in you, a number that's round." },
      riddle2: { countdown: '', text: "The number you got, get there by bus, in which we do trainings with first name gus" },
      activity: "Activity here: Draw a small picture of Karl somewhere here, send CJ a picture of your group with your Karl"
    }
  });

  const riddleTimes = {
    location1: {
      riddle1: moment.tz('2024-02-02 18:30', 'America/Los_Angeles'),
      riddle2: moment.tz('2024-02-02 18:40', 'America/Los_Angeles') // 10 minutes after riddle 1
    },
    location2: {
      riddle1: moment.tz('2024-02-02 19:00', 'America/Los_Angeles'),
      riddle2: moment.tz('2024-02-02 19:10', 'America/Los_Angeles') // 10 minutes after riddle 1
    },
    location3: {
      riddle1: moment.tz('2024-02-02 19:30', 'America/Los_Angeles'),
      riddle2: moment.tz('2024-02-02 19:40', 'America/Los_Angeles') // 10 minutes after riddle 1
    },
    location4: {
      riddle1: moment.tz('2024-02-02 20:00', 'America/Los_Angeles'),
      riddle2: moment.tz('2024-02-02 20:10', 'America/Los_Angeles') // 10 minutes after riddle 1
    }
  };

  const calculateCountdown = () => {
    let newRiddlesState = { ...riddlesState };
    const now = moment();

    Object.entries(riddleTimes).forEach(([location, riddles]) => {
      Object.entries(riddles).forEach(([riddleKey, time]) => {
        let duration = moment.duration(time.diff(now));
        let locationKey = location;
        let riddleNumber = riddleKey;

        if (duration.asSeconds() <= 0) {
          newRiddlesState[locationKey][riddleNumber].countdown = ''; // Clear the countdown
        } else {
          newRiddlesState[locationKey][riddleNumber].countdown = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
        }
      });
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
      <h1>Welcome to KESEM INITIATION 2024!</h1>
      <p className="explainer-text">
      Hello and welcome to Kesem initiation 2024! Below you will find 4 countdowns that will each reveal a riddle to a location you must drive to and complete a certain activity at. Once at the location, send Chicken Joe (408-881-2093) proof of your group doing the activity. Additionally, if you have time between locations, you can complete any item in the 'scavenger hunt' section to get extra points (must send proof to CJ). Feel free to text Chicken Joe if you have any questions! HAVE FUN, BE SAFE, AND GOOD LUCK  &lt;3
      </p>
      {Object.entries(riddlesState).map(([location, { riddle1, riddle2, activity }]) => (
        <div key={location} className="location-container">
          <h2>{location.replace('location', 'Location ')}</h2>
          <div className="riddle-container">
            <p className={riddle1.countdown ? 'countdown' : 'riddle'}>
              Riddle 1: {riddle1.countdown || riddle1.text}
            </p>
          </div>
          <div className="riddle-container">
            <p className={riddle2.countdown ? 'countdown' : 'riddle'}>
              Riddle 2: {riddle2.countdown || riddle2.text}
            </p>
          </div>
          <div className="activity-container">
            <p>{activity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ScavengerHuntList component
function ScavengerHuntList() {
  const items = ['Bring a DC glass of milk to the afterparty!', 'Switch your passenger seat returner with a different groups', 'Have your returners venmo gator for the after party (if they have yet to', 'Kiss 3 eggheads!', 'Have two group members interlock toes', 'Interlock toes with Chicken joe for $20 to your classy (This will not happen, unless he gets too milky...)', 'Touch tongues with a group member', 'Play captains coming with your group!', 'Sing a camp song', 'Get your nipples pierced', 'Climb a tree (be safe)', 'Find Cheeto (extra points if you bring him to Nemos)', 'Take a picture of the front door of someone in kesem (cannot be your returners places)', "Give ChumBuckets number to a stranger for a 'great time'", 'Find and Ice a director (Not one in your group)', 'Write a haiku about a VRGBA member', 'Call a family member and tell them why you love them', 'Call an alum and tell them how much they meant to Kesem!', 'Call a current Kesem member and tell them how much they mean to Kesem!']; // Add more items as needed
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
        {/* <div className="footer-images">
          <img src={`${process.env.PUBLIC_URL}/kesemphoto1.png`} alt="Kesem Photo 1" className="footer-image" />
          <img src={`${process.env.PUBLIC_URL}/kesemphoto2.png`} alt="Kesem Photo 2" className="footer-image" />
          <img src={`${process.env.PUBLIC_URL}/kesemphoto3.png`} alt="Kesem Photo 3" className="footer-image" />
          <img src={`${process.env.PUBLIC_URL}/kesemphoto4.png`} alt="Kesem Photo 4" className="footer-image" />
          <img src={`${process.env.PUBLIC_URL}/kesemphoto5.png`} alt="Kesem Photo 5" className="footer-image" />
          <img src={`${process.env.PUBLIC_URL}/kesemphoto6.png`} alt="Kesem Photo 6" className="footer-image" />
        </div> */}
      </div>
    </Router>
  );
}
export default App;
