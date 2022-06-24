import { createContext, useReducer, useState, useContext } from "react";
import UserReducer, { initialState } from "./UserReducer";

const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(UserReducer, initialState);
// };

export const UserProvider = ({ children }) => {
  const [selectedGender, setSelectedGender] = useState();
  const [bodyType, setBodyType] = useState("Ectomorph");
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(169);
  const [idealWeight, setIdealWeight] = useState();

  // if (bodyType === "Ectomorph") {

  // }
  // const newdata = idealWeight?.map((item) =>
  //   Math.round(item - (item / 100) * 10)
  // );
  // console.log(newdata);
  // const newdata = idealWeight.map((item) => item - (item / 100) * 10);
  // console.log(idealWeight);

  // if (bodyType === "Ectomorph") {
  //   setIdealWeight(idealWeight.map((item) => item - (item / 100) * 10));
  // } else if (bodyType === "Endomorph") {
  //   setIdealWeight(idealWeight.map((item) => item + (item / 100) * 10));
  // } else return;

  const values = {
    selectedGender,
    setSelectedGender,
    bodyType,
    setBodyType,
    weight,
    setWeight,
    height,
    setHeight,
    idealWeight,
    setIdealWeight,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
