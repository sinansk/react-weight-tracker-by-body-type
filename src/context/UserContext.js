import { createContext, useReducer, useState, useContext } from "react";
import UserReducer, { initialState } from "./UserReducer";

const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(UserReducer, initialState);
// };

export const UserProvider = ({ children }) => {
  const [selectedGender, setSelectedGender] = useState();
  const [bodyType, setBodyType] = useState("Ectomorph");
  const [weightInput, setWeightInput] = useState(60);
  const [heightInput, setHeightInput] = useState(169);
  const [userHeight, setUserHeight] = useState();
  const [userWeight, setUserWeight] = useState();
  const [idealWeight, setIdealWeight] = useState();
  const [bodyFat, setBodyFat] = useState();
  const [ageInput, setAgeInput] = useState(25);
  const [neckInput, setNeckInput] = useState(30);
  const [waistInput, setWaistInput] = useState(60);
  const [hipInput, setHipInput] = useState(90);
  const [loading, setLoading] = useState(false);

  const bmi = Math.round((userWeight / (userHeight * userHeight)) * 10000);
  console.log(bmi);

  // if (bodyType === "Ectomorph") {

  // }
  // const newdata = idealWeight?.map((item) =>
  //   Math.round(item - (item / 100) * 10)
  // );
  // console.log(newdata);
  // const newdata = idealWeight.map((item) => item - (item / 100) * 10);
  // console.log(idealWeight);

  // if (bodyType === "Ectomorph") {
  //   setIdealWeight(idealWeight?.map((item) => item - (item / 100) * 10));
  // } else if (bodyType === "Endomorph") {
  //   setIdealWeight(idealWeight?.map((item) => item + (item / 100) * 10));
  // } else return;

  const values = {
    selectedGender,
    setSelectedGender,
    bodyType,
    setBodyType,
    weightInput,
    setWeightInput,
    heightInput,
    setHeightInput,
    userHeight,
    setUserHeight,
    userWeight,
    setUserWeight,
    idealWeight,
    setIdealWeight,
    bodyFat,
    setBodyFat,
    ageInput,
    setAgeInput,
    neckInput,
    setNeckInput,
    waistInput,
    setWaistInput,
    hipInput,
    setHipInput,
    loading,
    setLoading,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
