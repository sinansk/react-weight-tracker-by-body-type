import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeasurementsCard from "./MeasurementsCard";
import { createModal } from "../../utils/modalHooks";
import moment from "moment";
import LoadingComponent from "../CommonComponents/LoadingComponent";
import EditButton from "../CommonComponents/EditButton";
import PhotoUploadComponent from "./PhotoUploadComponent";
import { BsGearWide } from "react-icons/bs"

const UserInfoComponent = () => {
  const user = useSelector((state) => state.user)

  const userRecords = useSelector((state) => state.userRecords?.records)

  const measurements = Object.keys(userRecords?.[0].data?.personalInfo).filter((key) =>
    ["arm", "calve", "chest", "foreArm", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
  ).sort()


  const [measurementsData, setMeasurementsData] = useState(userRecords?.[0].data?.personalInfo);
  const isLoading = user.status
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
  // useEffect(() => {
  //   updateQuote();
  // }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurementsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = bottomRef.current.getBoundingClientRect();
      const bottomPosition = window.innerHeight - top;

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    (isLoading === "loading" || userRecordsStatus === "loading" || userRecords.length === 0) ? (
      <LoadingComponent />
    ) : (
      <div ref={bottomRef} className="flex flex-col gap-2 p-2 lg:grid lg:grid-cols-6 lg:grid-rows-5 lg:mx-20 lg:h-96">
        <div className="flex items-center justify-center col-span-6 text-lg rounded-lg shadow-md lg:flex-col bg-cyan-400 bg-opacity-30 backdrop-filter backdrop-blur-md">
          <h2>Welcome <span className="font-semibold underline">{user.currentUser.email}</span> You are our member since {moment(user.currentUser?.createdAt * 1).format("DD MMM YYYY")}.</h2>
          <BsGearWide className="absolute my-auto text-2xl cursor-pointer right-2 " onClick={() => createModal("UpdateProfileModal")} />
        </div>

        <div className="relative col-span-3 col-start-1 row-span-2 row-start-2 p-2 font-mono rounded-lg shadow-md bg-amber-400 bg-opacity-30 backdrop-filter backdrop-blur-md">
          <h2 className="font-bold h-1/5">YOUR ACTUAL INFO</h2>
          <EditButton styleProps={`absolute right-1 top-1`} onClick={() => createModal("UserInfoModal", { willOpenModal: "MeasurementsModal" })} size={20} />
          <div className="grid grid-cols-2 p-2 text-left h-4/5">
            <div className=""><span className="font-semibold text-sky-600">Age:</span> {userRecords?.[0].data.personalInfo.age}</div>
            <div className=""><span className="font-semibold text-sky-600">Body Type:</span> {userRecords?.[0].data.personalInfo.bodyType} </div>
            <div className=""><span className="font-semibold text-sky-600">Height:</span> {userRecords?.[0].data.personalInfo.height + ` cm`}</div>
            <div className=""><span className="font-semibold text-sky-600">Body Goal:</span> {userRecords?.[0].data.personalInfo.bodyGoalStatus} </div>
            <div className=""><span className="font-semibold text-sky-600">Weight:</span> {userRecords?.[0].data.personalInfo.weight + ` kg`} </div>
            <div className=""><span className="font-semibold text-sky-600">Activity Level:</span> {userRecords?.[0].data.personalInfo.activityLevel}</div>
          </div>
        </div>
        <div className="col-span-3 col-start-1 row-span-2 row-start-4 p-2 font-mono bg-green-300 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">
          <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
          <div className="grid grid-cols-2 p-2 text-left h-4/5">
            <div className=""><span className="font-semibold text-sky-700">Ideal Weight:</span> {userRecords?.[0].data.results?.idealWeightRange}</div>
            <div className=""><span className="font-semibold text-sky-700">Weight Status:</span> {userRecords?.[0].data.results?.idealWeightStatus}</div>
            <div className=""><span className="font-semibold text-sky-700">Body Fat (%):</span> {userRecords?.[0].data.results?.bodyFatUsNavy}</div>
            <div className=""><span className="font-semibold text-sky-700">BMI:</span>{userRecords?.[0].data.results?.bmi}</div>
            <div className=""><span className="font-semibold text-sky-700">Daily Calorie Need For {userRecords?.[0].data.personalInfo.bodyGoalStatus}:</span> {userRecords?.[0].data.results?.calorieNeedByBodyGoal}</div>
            <div className="" ><span className="font-semibold text-sky-700">BMR:</span> {userRecords?.[0].data.results?.calorieNeed?.BMR} kcal</div>
          </div>
        </div>
        <div className="flex h-full col-span-2 col-start-4 row-span-4 p-2 font-mono rounded-lg shadow-md bg-fuchsia-400 bg-opacity-30 backdrop-filter backdrop-blur-md">
          <MeasurementsCard title="YOUR ACTUAL MEASUREMENTS" data={userRecords?.[0].data.personalInfo} isEdiTable={true} name="actualMeasurements" />
          <MeasurementsCard title="YOUR IDEAL MEASUREMENTS" data={userRecords?.[0].data.idealMeasurements} isEdiTable={false} name="idealMeasurements" />
        </div>
        <div className="flex flex-col h-full col-span-1 col-start-6 row-span-4 p-2 font-mono bg-teal-400 rounded-lg shadow-md bg-opacity-30 backdrop-filter backdrop-blur-md">

          <PhotoUploadComponent />
        </div>
      </div>
    )

  );
};

export default UserInfoComponent;
