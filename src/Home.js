import React, { useState, useEffect } from "react";
import firebase from "./firebaseConfig";

const Home = ({ user }) => {
  const [counters, setCounters] = useState(
    JSON.parse(localStorage.getItem("counters")) || [
      { id: 1, value: 0, label: "Counter 1", startValue: 0 },
    ]
  );

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const handleIncrement = (counterId) => {
    const updatedCounters = counters.map((counter) => {
      if (counter.id === counterId) {
        return { ...counter, value: counter.value + 1 };
      }
      return counter;
    });
    setCounters(updatedCounters);
  };

  const handleDecrement = (counterId) => {
    const updatedCounters = counters.map((counter) => {
      if (counter.id === counterId) {
        return { ...counter, value: counter.value - 1 };
      }
      return counter;
    });
    setCounters(updatedCounters);
  };

  const handleReset = (counterId) => {
    const updatedCounters = counters.map((counter) => {
      if (counter.id === counterId) {
        return { ...counter, value: counter.startValue };
      }
      return counter;
    });
    setCounters(updatedCounters);
  };

  const handleAddCounter = () => {
    const newCounterId = counters.length + 1;
    const newCounter = {
      id: newCounterId,
      value: 0,
      label: `Counter ${newCounterId}`,
      startValue: 0,
    };
    setCounters([...counters, newCounter]);
  };

  const handleRemoveCounter = (counterId) => {
    const updatedCounters = counters.filter((counter) => counter.id !== counterId);
    setCounters(updatedCounters);
  };

  const handleLabelChange = (counterId, newLabel) => {
    const updatedCounters = counters.map((counter) => {
      if (counter.id === counterId) {
        return { ...counter, label: newLabel };
      }
      return counter;
    });
    setCounters(updatedCounters);
  };

  const handleStartValueChange = (counterId, newStartValue) => {
    const updatedCounters = counters.map((counter) => {
      if (counter.id === counterId) {
        return { ...counter, startValue: parseInt(newStartValue) };
      }
      return counter;
    });
    setCounters(updatedCounters);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <div className="my-5">
        {counters.map((counter) => (
          <div key={counter.id}>
            <h3>
              <input
                type="text"
                value={counter.label}
                onChange={(e) => handleLabelChange(counter.id, e.target.value)}
              />
              : {counter.value}
            </h3>
            <div>
              <button className="btn btn-success mx-3" onClick={() => handleIncrement(counter.id)}>
                Increment
              </button>
              <button className="btn btn-danger mx-3" onClick={() => handleDecrement(counter.id)}>
                Decrement
              </button>
              <button className="btn btn-secondary mx-3" onClick={() => handleReset(counter.id)}>
                Reset
              </button>
              <label htmlFor={`startValue_${counter.id}`}>Start Value:</label>
              <input
                type="number"
                id={`startValue_${counter.id}`}
                value={counter.startValue}
                onChange={(e) => handleStartValueChange(counter.id, e.target.value)}
              />
              <button className="btn btn-warning mx-3" onClick={() => handleRemoveCounter(counter.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary my-3" onClick={handleAddCounter}>
          Add Counter
        </button>
      </div>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
