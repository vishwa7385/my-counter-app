import React, { createContext } from 'react';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ firebase, children }) => {
  // Your context provider logic here, if any
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
