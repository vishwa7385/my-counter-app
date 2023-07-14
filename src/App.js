import React, { useState, useEffect } from "react";
import firebase from "./firebaseConfig";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Counter App</h1>
        <div className="content">
          {user ? (
            <Home user={user} />
          ) : (
            <div className="auth-container">
              <Login />
              <Signup />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
