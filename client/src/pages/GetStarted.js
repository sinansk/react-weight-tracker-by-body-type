import { useCallback, useEffect, useState } from "react";
import BodyFatInfoComponent from "../components/GetStartedComponents/BodyFatInfoComponent";
import BodyTypeInfoComponent from "../components/GetStartedComponents/BodyTypeInfoComponent";
import { useDispatch, useSelector } from "react-redux/";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import GenderComponent from "../components/GetStartedComponents/GenderComponent";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight, updateIdealMeasurements } from "../redux/userInfoThunk";
import { fetchUserInfo } from "../redux/userRecordsThunk";
import StepButton from "../components/GetStartedComponents/StepButton";
import Stepper from "../components/GetStartedComponents/Stepper";
import IdealWeightComponent from "../components/IdealWeightComponent";
import moment from "moment";
import useUpdateUserInfo from "../utils/useUpdateUserInfo";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const user = useSelector((state) => state.user);
  const personalInfo = user.data?.personalInfo;
  const userGender = personalInfo?.gender;
  const [registerStep, setRegisterStep] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const updateUserInfo = useUpdateUserInfo()
  const handleStep = async (e) => {
    e.preventDefault();
    if (e.target.name === "NEXT" && registerStep >= 0 && registerStep < 3) {
      setRegisterStep((prev) => prev + 1);
    } else if (e.target.name === "BACK" && registerStep > 0) {
      setRegisterStep((prev) => prev - 1);
    }
    if (e.target.name === "CONFIRM" && registerStep === 3) {
      await updateUserInfo()
      const timeoutId = setTimeout(() => {
        navigate("/mystats", { replace: true }); // sayfa yönlendirmesi
      }, 6000); // 6 saniye
      return () => clearTimeout(timeoutId);
    }
  };


  return (
    <>
      {/* {user.currentUser.emailVerified && ( */}
      <div className="flex flex-col items-center justify-center w-screen h-full min-h-screen gap-2 sm:gap-10 md:h-screen md:flex ">
        <Stepper registerStep={registerStep} setRegisterStep={setRegisterStep} onStepChange={handleStep} />
        <div className="flex flex-col w-full mt-10 lg:flex-row lg:w-1/2">
          {registerStep === 0 && (
            <>
              <GenderComponent gender={"female"} />
              <GenderComponent gender={"male"} />
            </>
          )}
          {registerStep === 1 && (
            <>
              <IdealWeightComponent gender={"female"} />
              <IdealWeightComponent gender={"male"} />
            </>
          )}
          {registerStep === 2 && (
            <>
              <BodyTypeInfoComponent gender={"female"} />
              <BodyTypeInfoComponent gender={"male"} />
            </>
          )}
          {registerStep === 3 && (
            <>
              <BodyFatInfoComponent gender={"female"} />
              <BodyFatInfoComponent gender={"male"} />
            </>
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          {registerStep > 0 && (
            <StepButton text="BACK" onClick={handleStep} loading={loading} />
          )}
          {userGender ? (
            <StepButton text={registerStep === 3 ? "CONFIRM" : "NEXT"} onClick={handleStep} loading={loading} />
          ) : <div className="h-[60px]"></div>}
        </div>

      </div>
    </>
  );
};

export default GetStarted;
