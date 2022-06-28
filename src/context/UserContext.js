import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
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
  const [activityLevel, setActivityLevel] = useState("level_1");
  const [dailiyCalorie, setDailyCalorie] = useState();
  const [bodyGoal, setBodyGoal] = useState();
  const [ageInput, setAgeInput] = useState(29);
  const [neckInput, setNeckInput] = useState(34);
  const [waistInput, setWaistInput] = useState(73);
  const [hipInput, setHipInput] = useState(86);
  const [wristInput, setWristInput] = useState(15);
  const [loading, setLoading] = useState(false);
  const [idealChest, setIdealChest] = useState();
  const [idealNeck, setIdealNeck] = useState();
  const [idealArm, setIdealArm] = useState();
  const [idealForeAram, setIdealForeArm] = useState();
  const [idealWaist, setIdealWaist] = useState();
  const [idealHip, setIdealHip] = useState();
  const [idealThigh, setIdealThigh] = useState();
  const [idealCalve, setIdealCalve] = useState();
  const [idealShoulder, setIdealShoulder] = useState();
  const bmi = Math.round((userWeight / (userHeight * userHeight)) * 10000);
  console.log(bmi);

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
    activityLevel,
    setActivityLevel,
    bodyGoal,
    setBodyGoal,
    dailiyCalorie,
    setDailyCalorie,
    wristInput,
    setWristInput,
    idealNeck,
    setIdealNeck,
    idealShoulder,
    setIdealShoulder,
    idealChest,
    setIdealChest,
    idealArm,
    setIdealArm,
    idealForeAram,
    setIdealForeArm,
    idealWaist,
    setIdealWaist,
    idealHip,
    setIdealHip,
    idealThigh,
    setIdealThigh,
    idealCalve,
    setIdealCalve,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
