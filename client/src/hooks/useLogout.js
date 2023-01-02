import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

// to logout no need to contact backend
// we can clear global state back to null & clear local storage user (similar to delete cookie)

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from local storage(browser storage)
    localStorage.removeItem("user");
    // reset the global state back to null
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return { logout };
};
