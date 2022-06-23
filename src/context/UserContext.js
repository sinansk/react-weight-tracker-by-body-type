import { createContext, useReducer, useState, useContext } from "react";
import UserReducer, { initialState } from "./UserReducer";

const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(UserReducer, initialState);
// };

export const UserProvider = ({ children }) => {
  const [selectedGender, setSelectedGender] = useState();

  const values = {
    selectedGender,
    setSelectedGender,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
