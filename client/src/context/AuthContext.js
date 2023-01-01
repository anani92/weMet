import { createContext, useEffect, useReducer } from "react";

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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  //everytime state changes (login or logout) then will see this state printed to console
  console.log("AuthContext state (Global State):", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
