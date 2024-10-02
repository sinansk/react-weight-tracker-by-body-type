import { useCallback, useEffect, useState } from "react";
import BodyFatInfoComponent from "../components/GetStartedComponents/BodyFatInfoComponent";
import BodyTypeInfoComponent from "../components/GetStartedComponents/BodyTypeInfoComponent";
import { useDispatch, useSelector } from "react-redux/";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import GenderComponent from "../components/GetStartedComponents/GenderComponent";
import {
  fetchBodyFat,
  fetchCalorieNeed,
  fetchIdealWeight,
  updateIdealMeasurements,
} from "../redux/userInfoThunk";
import { fetchUserInfo } from "../redux/userRecordsThunk";
import StepButton from "../components/GetStartedComponents/StepButton";
import Stepper from "../components/GetStartedComponents/Stepper";
import IdealWeightComponent from "../components/IdealWeightComponent";
import moment from "moment";
import useUpdateUserInfo from "../utils/useUpdateUserInfo";
import toast from "react-hot-toast";
import { setTourActive } from "../redux/uiTour";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const user = useSelector((state) => state.user);
  const personalInfo = user.data?.personalInfo;
  const measurements = user.data?.measurements;
  const userGender = personalInfo?.gender;
  const [activeStep, setActiveStep] = useState(1);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const updateUserInfo = useUpdateUserInfo();
  const handleStep = async (e) => {
    e.preventDefault();
    const isValid = await checkFormValid(activeStep);
    if (e.target.name === "NEXT") {
      isValid && setActiveStep((prev) => prev + 1);
    } else if (e.target.name === "BACK" && activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
    if (e.target.name === "CONFIRM" && activeStep === 4) {
      if (isValid) {
        await updateUserInfo();
        dispatch(setTourActive(true));
        const timeoutId = setTimeout(() => {
          navigate("/mystats", { replace: true });
        }, 6000);
        return () => clearTimeout(timeoutId);
      }
    }
  };

  const checkFormValid = async (step) => {
    const requiredFieldsByStep = [
      [],
      ["gender"],
      ["bodyType", "birthDay", "height", "weight"],
      ["bodyGoal", "activityLevel"],
      [
        "neck",
        "shoulder",
        "chest",
        "arm",
        "forearm",
        "wrist",
        "waist",
        "hip",
        "thigh",
        "calve",
      ],
    ];
    const requiredFields = requiredFieldsByStep[step];
    for (const field of requiredFields) {
      if ((!userGender || !personalInfo[field]) && !measurements[field]) {
        toast.error("Please fill all the fields");
        return false;
      }
    }
    return true;
  };
  return (
    <>
      {/* {user.currentUser.emailVerified && ( */}
      <div className="flex flex-col items-center justify-center w-screen h-full min-h-screen gap-2 sm:gap-10 md:h-screen md:flex ">
        <Stepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onStepChange={handleStep}
          checkFormValid={checkFormValid}
        />
        <div className="flex flex-col w-full mt-10 lg:flex-row lg:w-1/2">
          {activeStep === 1 && (
            <>
              <GenderComponent gender={"female"} />
              <GenderComponent gender={"male"} />
            </>
          )}
          {activeStep === 2 && (
            <>
              <IdealWeightComponent gender={"female"} />
              <IdealWeightComponent gender={"male"} />
            </>
          )}
          {activeStep === 3 && (
            <>
              <BodyTypeInfoComponent gender={"female"} />
              <BodyTypeInfoComponent gender={"male"} />
            </>
          )}
          {activeStep === 4 && (
            <>
              <BodyFatInfoComponent gender={"female"} />
              <BodyFatInfoComponent gender={"male"} />
            </>
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          {activeStep > 1 && (
            <StepButton text="BACK" onClick={handleStep} loading={loading} />
          )}
          {userGender ? (
            <StepButton
              text={activeStep === 4 ? "CONFIRM" : "NEXT"}
              onClick={handleStep}
              loading={loading}
            />
          ) : (
            <div className="h-[60px]"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetStarted;
