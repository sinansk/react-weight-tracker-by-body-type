import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../redux/userRedux";
import { activityLevels, ages, bodyGoals, bodyTypes, heights, weights } from "../data";
import SelectInput from "./SelectInput";
import EditButton from "./EditButton";
import moment from 'moment';
import Modal from "./Modal";

import { addUserInfo } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { fetchUserInfo } from "../redux/userRecordsThunk";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight, updateIdealMeasurements } from "../redux/userInfoThunk";
import LoadingComponent from "./LoadingComponent";
import MeasurementsCard from "./MeasurementsCard";
import ProfileIcon from "./ProfileIcon";
import axios from "axios";

const UserInfoComponent = () => {
  const user = useSelector((state) => state.user)
  const userRecords = useSelector((state) => state.userRecords?.records)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser);
  const measurements = Object.keys(userRecords?.[0].data.personalInfo).filter((key) =>
    ["arm", "calve", "chest", "foreArm", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
  ).sort()
  console.log("measurements,", measurements)
  const idealMeasurements = Object.keys(userRecords?.[0].data.idealMeasurements)?.sort()
  const [measurementsData, setMeasurementsData] = useState(userRecords?.[0].data.personalInfo);
  const isLoading = currentUser.status
  const userRecordsStatus = useSelector((state) => state.userRecords.status);
  const [quote, setQuote] = useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/quotes/random?minLength=80&maxLength=140?tags=motivational|inspirational|health|happiness|success");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setQuote(data[0]);
      console.log("atasözü,", data)
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setQuote({ content: "Opps... Something went wrong" });
    }
  }

  // Run `updateQuote` once when component mounts
  useEffect(() => {
    updateQuote();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurementsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    modalRef.current.openModal()
  }
  const modalRef = useRef();
  const actualInfoModal = useRef();

  const handleActualInfoModal = () => {
    actualInfoModal.current.openModal()
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const updateHandle = async (e) => {
    if (e.target.name === "actualInfo") {
      try {
        await Promise.all([
          dispatch(fetchIdealWeight()),
          dispatch(fetchCalorieNeed()),
          delay(5000),
          syncData(),
          delay(5000),
        ]);
        await dispatch(fetchUserInfo()); // Dispatch fetchUserInfo after other requests are completed
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.name === "actualMeasurements") {
      try {
        await Promise.all([
          dispatch(fetchBodyFat()),
          console.log("dispatchFetchBodyFat çalıştı"),
          dispatch(updateIdealMeasurements()),
          console.log("dispatchUpdateIdealMeasurement çalıştı"),
          delay(5000),
          syncData(),
          delay(5000),
        ]);
        await dispatch(fetchUserInfo()); // Dispatch fetchUserInfo after other requests are completed
      } catch (err) {
        console.log(err);
      }
    }
  };

  const syncData = async () => {
    const data = {
      date: serverTimestamp(),
      uid: user.currentUser.uid,
      personalInfo: user.data.personalInfo,
      idealMeasurements: user.data?.idealMeasurements,
      results: user.data.results,
    };

    try {
      await addUserInfo(data);
      console.log("ADDUSERINFO ÇALIŞTI");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = bottomRef.current.getBoundingClientRect();
      const bottomPosition = window.innerHeight - top;
      console.log('Bottom Position:', bottomPosition, "top", top);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  return (
    (isLoading === "loading" || isLoading === "idle" || userRecordsStatus === "loading" || userRecords.length === 0) ? (
      <LoadingComponent />
    ) : (
      <div ref={bottomRef} className="flex flex-col gap-2 p-2 lg:grid lg:grid-cols-6 lg:grid-rows-5 lg:mx-20 lg:h-96">
        <div className="flex items-center justify-center col-span-6 text-lg rounded-lg shadow-md lg:flex-col bg-cyan-400 bg-opacity-30 backdrop-filter backdrop-blur-md">
          <blockquote className="">
            <p>{quote?.content}</p>
            {quote?.author && (
              <footer className="">
                <cite title="Source Title">{quote.author}</cite>
              </footer>
            )}
          </blockquote>
          {/* <p>{moment().format("MM ddd, YYYY HH:MM")}</p> */}
        </div>

        <div className="relative col-span-3 col-start-1 row-span-2 row-start-2 p-2 bg-yellow-400 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">

          <h2 className="font-bold h-1/5">YOUR ACTUAL INFO</h2>
          <EditButton styleProps={`absolute right-1 top-1`} onClick={handleActualInfoModal} />
          <Modal ref={actualInfoModal} styleProps={`w-96 h-96 `}>
            <div className="grid grid-cols-2 gap-2 h-4/5">

              <div><SelectInput options={ages} label="Age," name="age" /></div>
              <div><SelectInput options={bodyTypes} label="My fingers are," name="bodyType" /></div>
              <div><SelectInput options={heights} label="Height" name="height" /></div>
              <div><SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" /> </div>
              <div><SelectInput options={weights} label="Weight" name="weight" /></div>
              <div><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" /></div>
            </div>
            <button className="h-10 mt-5 bg-indigo-700 px-1 py-2.5 text-white hover:bg-indigo-500 rounded-sm" name="actualInfo" onClick={updateHandle}>UPDATE</button>
          </Modal>

          <div className="grid grid-cols-2 p-2 text-left h-4/5">
            <div className=""><span className="font-semibold text-pink-600">Age:</span> {userRecords?.[0].data.personalInfo.age}</div>
            <div className=""><span className="font-semibold text-pink-600">Body Type:</span> {userRecords?.[0].data.personalInfo.bodyType} </div>
            <div className=""><span className="font-semibold text-pink-600">Height:</span> {userRecords?.[0].data.personalInfo.height + ` cm`}</div>
            <div className=""><span className="font-semibold text-pink-600">Body Goal:</span> {userRecords?.[0].data.personalInfo.bodyGoalStatus} </div>
            <div className=""><span className="font-semibold text-pink-600">Weight:</span> {userRecords?.[0].data.personalInfo.weight + ` kg`} </div>
            <div className=""><span className="font-semibold text-pink-600">Activity Level:</span> {userRecords?.[0].data.personalInfo.activityLevel}</div>
          </div>
        </div>
        <div className="col-span-3 col-start-1 row-span-2 row-start-4 p-2 bg-green-500 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">
          <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
          <div className="grid grid-cols-2 p-2 text-left h-4/5">
            <div className=""><span className="font-semibold text-pink-600">Ideal Weight:</span> {userRecords?.[0].data.results?.idealWeightRange}</div>
            <div className=""><span className="font-semibold text-pink-600">Weight Status:</span> {userRecords?.[0].data.results?.idealWeightStatus}</div>
            <div className=""><span className="font-semibold text-pink-600">Body Fat (%):</span> {userRecords?.[0].data.results?.bodyFatUsNavy}</div>
            <div className=""><span className="font-semibold text-pink-600">BMI:</span>{userRecords?.[0].data.results?.bmi}</div>
            <div className=""><span className="font-semibold text-pink-600">Daily Calorie Need For {userRecords?.[0].data.personalInfo.bodyGoalStatus}:</span> {userRecords?.[0].data.results?.calorieNeedByBodyGoal}</div>
            <div className="" ><span className="font-semibold text-pink-600">BMR:</span> {userRecords?.[0].data.results?.calorieNeed?.BMR} kcal</div>
          </div>
        </div>
        <div className="flex h-full col-span-3 col-start-4 row-span-4 p-2 bg-pink-400 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">
          <MeasurementsCard title="YOUR ACTUAL MEASUREMENTS" data={userRecords?.[0].data.personalInfo} isEdiTable={true} name="actualMeasurements" handleUpdate={updateHandle} />
          <MeasurementsCard title="YOUR IDEAL MEASUREMENTS" data={userRecords?.[0].data.idealMeasurements} isEdiTable={false} name="idealMeasurements" />
        </div>
      </div>
    )

  );
};

export default UserInfoComponent;
