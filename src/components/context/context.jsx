import React, { useReducer } from "react";

export const Context = React.createContext({
  alertIsShown: false,
  message: "",
  setAlertOn: (message) => {},
});

const initialValue = {
  IsShown: false,
  message: "",
};

const myDataReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { message: action.message, IsShown: true };
    case "CLOSE":
      return { message: null, IsShown: false };
  }
};

const ContextProvider = ({ children }) => {
  const [myData, dispatch] = useReducer(myDataReducer, initialValue);

  function setAlertOnHandler(message) {
    dispatch({ type: "SET", message: message });
  }
  function setAlertOffHandler() {
    dispatch({ type: "CLOSE" });
  }

  const contextData = {
    alertIsShown: myData.IsShown,
    message: myData.message,
    setAlertOn: setAlertOnHandler,
    setAlertOff: setAlertOffHandler,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

export default ContextProvider;
