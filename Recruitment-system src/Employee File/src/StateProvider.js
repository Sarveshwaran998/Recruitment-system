import React, { createContext, useContext, useReducer } from "react";

//dataLayer
export const StateContext = createContext();

//wrap
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
    </StateContext.Provider>
);

//pull information
export const useStateValue = () => useContext(StateContext);