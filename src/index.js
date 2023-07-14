import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from './firebaseConfig';
import { FirebaseContextProvider } from './FirebaseContextProvider';

ReactDOM.render(
  <FirebaseContextProvider firebase={firebase}>
    <App />
  </FirebaseContextProvider>,
  document.getElementById('root')
);
