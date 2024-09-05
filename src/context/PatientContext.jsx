import React, { createContext, useReducer } from 'react';

const initialState = {
  currentUser: null,
  users: [], // Array to store registered users
};

const PatientContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      // Add new user to the users array
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'LOGIN_USER':
      // Find the user and set as currentUser
      const user = state.users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );
      return {
        ...state,
        currentUser: user || null,
      };
    default:
      return state;
  }
};

const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;