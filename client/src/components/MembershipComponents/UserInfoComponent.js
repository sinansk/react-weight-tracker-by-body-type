import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MeasurementsCard from "./MeasurementsCard";
import { createModal } from "../../utils/modalHooks";
import moment from "moment";
import { SiAddthis } from "react-icons/si";
import PhotoDisplayComponent from "./PhotoDisplayComponent";
import UserInfoLoader from "./UserInfoLoader";
import BigLoader from "../CommonComponents/Loaders/BigLoader";
import ProfileLoader from "../CommonComponents/Loaders/ProfileLoader";
const UserInfoComponent = () => {
  const user = useSelector((state) => state.user)
  const userData = user?.data
  const userRecords = useSelector((state) => state.userRecords?.records)
  const isLoading = user.status
  const userRecordsStatus = useSelector((state) => state.userRecords.status);
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
    <div ref={bottomRef} className="flex flex-col gap-2 p-2 lg:grid lg:grid-cols-6 lg:grid-rows-5 lg:mx-20 lg:h-96">


      <div className="flex items-center justify-center col-span-6 text-lg rounded-lg shadow-md lg:flex-col bg-cyan-400/20 bg-opacity-30 backdrop-filter backdrop-blur-md">
        <h2>Welcome <span className="font-semibold underline">{user.currentUser.email}</span> You are our member .</h2>
        <SiAddthis className="absolute my-auto text-2xl cursor-pointer right-8 hover:text-pink-500 " onClick={() => createModal("UpdateProfileModal")} title="Add Body Record" />
      </div>
      <div className="relative col-span-3 col-start-1 row-span-2 row-start-2 p-2 font-mono rounded-lg shadow-md bg-amber-400/30 backdrop-filter backdrop-blur-md">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />) : (
          <>
            <h2 className="font-bold h-1/5">YOUR ACTUAL INFO</h2>
            {/* <EditButton styleProps={`absolute right-1 top-1`} onClick={() => createModal("UserInfoModal", { willOpenModal: "MeasurementsModal" })} size={20} /> */}
            <div className="grid grid-cols-2 p-2 text-left h-4/5">
              <div className=""><span className="font-semibold text-sky-600">Age:</span> {userData.personalInfo.age}</div>
              <div className=""><span className="font-semibold text-sky-600">Body Type:</span> {userData.personalInfo.bodyType} </div>
              <div className=""><span className="font-semibold text-sky-600">Height:</span> {userData.personalInfo.height + ` cm`}</div>
              <div className=""><span className="font-semibold text-sky-600">Body Goal:</span> {userData.personalInfo.bodyGoalStatus} </div>
              <div className=""><span className="font-semibold text-sky-600">Weight:</span> {userData.personalInfo.weight + ` kg`} </div>
              <div className=""><span className="font-semibold text-sky-600">Activity Level:</span> {userData.personalInfo.activityLevel}</div>
            </div>
          </>
        )}
      </div>
      <div className="col-span-3 col-start-1 row-span-2 row-start-4 p-2 font-mono rounded-lg shadow-md bg-green-300/20 backdrop-filter backdrop-blur-md">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />) : (
          <>
            <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
            <div className="grid grid-cols-2 p-2 text-left h-4/5">
              <div className=""><span className="font-semibold text-sky-700">Ideal Weight:</span> {userData.results?.idealWeightRange}</div>
              <div className=""><span className="font-semibold text-sky-700">Body Fat (%):</span> {userData.results?.bodyFatUsNavy}</div>
              <div className=""><span className="font-semibold text-sky-700">Weight Status:</span> {userData.results?.idealWeightStatus}</div>
              <div className="" ><span className="font-semibold text-sky-700">BMR:</span> {userData.results?.calorieNeed?.BMR} kcal</div>
              <div className=""><span className="font-semibold text-sky-700">BMI:</span>{userData.results?.bmi}</div>
              <div className=""><span className="font-semibold text-sky-700">Daily Calorie Need For {userData.personalInfo.bodyGoalStatus}:</span> {userData?.results?.calorieNeedByBodyGoal}</div>
            </div>
          </>
        )}
      </div>
      <div className="flex h-full col-span-2 col-start-4 row-span-4 p-2 font-mono rounded-lg shadow-md bg-rose-500/10 backdrop-filter backdrop-blur-md">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <div className="flex justify-around w-full ">
            <BigLoader />
            <BigLoader />
          </div>
        ) : (
          <>
            <MeasurementsCard title="YOUR ACTUAL MEASUREMENTS" data={userData.personalInfo} isEdiTable={true} name="actualMeasurements" />
            <MeasurementsCard title="YOUR IDEAL MEASUREMENTS" data={userData.idealMeasurements} isEdiTable={false} name="idealMeasurements" />
          </>
        )}
      </div>
      <div className="flex flex-col h-full col-span-1 col-start-6 row-span-4 p-2 font-mono rounded-lg shadow-md bg-teal-400/20 backdrop-filter backdrop-blur-md">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <ProfileLoader />
        ) : (
          <PhotoDisplayComponent item={userRecords?.[0]} isEditable={true} willUpdateNow={true} className="w-40 h-40 mx-auto lg:w-full lg:h-full" />
        )}
      </div>
    </div>
  )
};

export default UserInfoComponent;
