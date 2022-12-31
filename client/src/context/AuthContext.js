import { createContext, useReducer } from "react";

// context compoenet
export const AuthContext = createContext();

// take previous state and function to handle different cases
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //take the payload from token which have user details
      return { user: action.payload };
    case "LOGOUT":
      // reset to null
      return { user: null };
    default:
      return state;
  }
};

// this will wrap other components to provide global state
export const AuthContextProvider = ({ children }) => {
  // register the state , initial state is a user with null
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  //everytime state changes (login or logout) then will see this state printed to console
  console.log(`AuthContext state:${state}`);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};