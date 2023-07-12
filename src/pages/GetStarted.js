import { useCallback, useEffect, useState } from "react";
import BasicInfoComponent from "../components/GetStartedComponents/BasicInfoComponent";
import BodyFatInfoComponent from "../components/GetStartedComponents/BodyFatInfoComponent";
import BodyTypeInfoComponent from "../components/GetStartedComponents/BodyTypeInfoComponent";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux/";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import GenderComponent from "../components/GetStartedComponents/GenderComponent";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight, updateIdealMeasurements } from "../redux/userInfoThunk";
import { fetchUserInfo } from "../redux/userRecordsThunk";
import Stepper from "../components/Stepper";
import ButtonPrimary from "../components/ButtonPrimary";
const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const user = useSelector((state) => state.user);
  const personalInfo = user.data?.personalInfo;
  const userGender = personalInfo?.gender;
  const [registerStep, setRegisterStep] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const handleStep = async (e) => {
    e.preventDefault();

    if (e.target.name === "NEXT" && registerStep >= 0 && registerStep < 3) {
      setRegisterStep((prev) => prev + 1);
    } else if (e.target.name === "BACK" && registerStep > 0) {
      setRegisterStep((prev) => prev - 1);
    }

    if (e.target.name === "NEXT" && registerStep === 2) {
      await dispatch(fetchIdealWeight());
      await dispatch(fetchCalorieNeed());
    }

    if (e.target.name === "NEXT" && registerStep === 3) {
      handleSubmit()
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      // Dispatch the async actions
      await Promise.all([
        dispatch(fetchBodyFat()),
        dispatch(updateIdealMeasurements()),

      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    } finally {
      setLoading(false);
      setIsFetchingData(false);
    }
  }, [dispatch]);

  const userInfoToDB = useCallback(async () => {
    await addUserInfo({
      date: serverTimestamp(),
      uid: user.currentUser.uid,
      personalInfo: user.data?.personalInfo,
      idealMeasurements: user.data?.idealMeasurements,
      results: user.data?.results,
    });
    dispatch(fetchUserInfo(user.currentUser.uid)); // fetchUserInfo işlemini tetikle
  }, [dispatch, user.currentUser.uid, user.data?.personalInfo, user.data?.idealMeasurements, user.data?.results]);


  useEffect(() => {
    if (!isFetchingData) {
      userInfoToDB();
      // const timeoutId = setTimeout(() => {
      navigate("/mystats", { replace: true }); // sayfa yönlendirmesi
      // }, 4000); // 4 saniye

      // return () => clearTimeout(timeoutId);
    }
  }, [dispatch, userInfoToDB, isFetchingData, user.currentUser.uid, navigate]);


  return (
    <>
      {/* {user.currentUser.emailVerified && ( */}
      <div className="w-screen h-screen">
        <Navbar />
        <Stepper steps={5} registerStep={registerStep} setRegisterStep={setRegisterStep} onStepChange={handleStep} />
        <div className="flex flex-col flex-1 mx-auto mt-16 lg:flex-row lg:w-1/2">
          {registerStep === 0 && (
            <>
              <GenderComponent gender={"female"} />
              <GenderComponent gender={"male"} />
            </>
          )}
          {registerStep === 1 && (
            <>
              <BasicInfoComponent gender={"female"} />
              <BasicInfoComponent gender={"male"} />
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
        {registerStep > 0 && (
          <ButtonPrimary name="BACK" onClick={handleStep} loading={loading} />
        )}
        {userGender && (
          <ButtonPrimary name="NEXT" onClick={handleStep} loading={loading} />
        )}
      </div>
    </>
  );
};

export default GetStarted;
