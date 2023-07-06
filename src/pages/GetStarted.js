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

    if (e.target.name === "next" && registerStep >= 0 && registerStep < 3) {
      setRegisterStep((prev) => prev + 1);
    } else if (e.target.name === "previous" && registerStep > 0) {
      setRegisterStep((prev) => prev - 1);
    }

    if (e.target.name === "next" && registerStep === 2) {
      await dispatch(fetchIdealWeight());
      await dispatch(fetchCalorieNeed());
    }

    if (e.target.name === "next" && registerStep === 3) {
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
        <div className="h-12 mx-auto sm:w-1/2 xl:h-24">
          <div className="flex flex-col items-center justify-center mx-4 text-white border-2 rounded-md xl:text-2xl bg-fuchsia-400 border-fuchsia-500 xl:h-full">
            <h2>SELECT YOUR GENDER</h2>
          </div>
        </div>
        <div className="flex flex-col flex-1 mx-auto mt-4 lg:flex-row lg:w-1/2">
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
          <a
            name="previous"
            onClick={handleStep}
            className="relative inline-flex items-center px-8 py-3 mx-2 overflow-hidden text-white rounded-sm sm:mt-4 bg-fuchsia-500 group active:bg-fuchsia-300 focus:outline-none focus:ring"
            href="/"
          >
            <span className="absolute left-0 transition-transform rotate-180 -translate-x-full group-hover:translate-x-4">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:ml-4">
              {!loading ? (
                "BACK"
              ) : (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-2 animate-spin fill-cyan-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </span>
          </a>
        )}
        {userGender && (
          <a
            name="next"
            onClick={handleStep}
            className="relative inline-flex items-center px-8 py-3 mx-2 overflow-hidden text-white rounded-sm sm:mt-4 bg-fuchsia-500 group active:bg-fuchsia-300 focus:outline-none focus:ring"
            href="/"
          >
            <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:ml-4">
              {!loading ? (
                "NEXT"
              ) : (
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-2 animate-spin fill-cyan-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </span>
          </a>


        )}

      </div>



      {/* )} */}
    </>
  );
};

export default GetStarted;
