import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MeasurementsCard from "./MeasurementsCard";
import { createModal } from "../../utils/modalHooks";
import { SiAddthis } from "react-icons/si";
import PhotoDisplayComponent from "./PhotoDisplayComponent";
import UserInfoLoader from "../CommonComponents/Loaders/UserInfoLoader";
import BigLoader from "../CommonComponents/Loaders/BigLoader";
import ProfileLoader from "../CommonComponents/Loaders/ProfileLoader";
import ButtonPrimary from "../CommonComponents/ButtonPrimary";
import { AiOutlineCloudUpload } from "react-icons/ai";
const UserInfoComponent = () => {
  const user = useSelector((state) => state.user)
  const userRecords = useSelector((state) => state.userRecords?.records)
  const userData = userRecords?.[0].data
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
    <div ref={bottomRef} className="flex flex-col gap-2 p-2 text-sm sm:text-base lg:grid lg:grid-cols-6 lg:grid-rows-5 lg:mx-20 lg:h-96">
      <button onClick={() => createModal("AddNewRecordModal")} title="Add Body Record" type="button" className="flex items-center justify-center col-span-6 gap-5 text-xs rounded-lg shadow-md new-record text-gray-50 lg:text-xl bg-cyan-400/80 hover:bg-cyan-400 backdrop-blur-md">
        <AiOutlineCloudUpload className="w-8 h-8 lg:w-14 lg:h-14" />
        <h3 className="font-bold">Add New Record</h3>
        <AiOutlineCloudUpload className="w-8 h-8 lg:w-14 lg:h-14" />
        {/* <h2 className="hidden sm:block">Welcome <span className="font-semibold underline ">{user.currentUser.email}</span> You are our member .</h2>
        <SiAddthis className="absolute hidden my-auto text-2xl cursor-pointer sm:block sm:right-8 hover:text-gray-200 " onClick={() => createModal("UpdateProfileModal")} title="Add Body Record" /> */}
      </button>
      <div className="relative col-span-3 col-start-1 row-span-2 row-start-2 font-mono text-gray-200 rounded-lg shadow-md sm:p-2 bg-teal-700/50 backdrop-blur-md actual-info">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />) : (
          <>
            <h2 className="text-base font-bold h-1/5">ACTUAL INFO</h2>
            {/* <EditButton styleProps={`absolute right-1 top-1`} onClick={() => createModal("UserInfoModal", { willOpenModal: "MeasurementsModal" })} size={20} /> */}
            <div className="grid grid-cols-7 p-2 text-left sm:grid-cols-2 h-4/5">
              <div className="col-span-3 sm:col-span-1">
                <p className=""><span className="font-semibold text-cyan-400">Age:</span> {userData?.personalInfo.age}</p>
                <p className=""><span className="font-semibold text-cyan-400">Height:</span> {userData?.personalInfo.height + ` cm`}</p>
                <p className=""><span className="font-semibold text-cyan-400">Weight:</span> {userData?.personalInfo.weight + ` kg`}</p>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <p className=""><span className="font-semibold text-cyan-400">Body Type:</span> {userData?.personalInfo.bodyType}</p>
                <p className=""><span className="font-semibold text-cyan-400">Body Goal:</span> {userData?.personalInfo.bodyGoalStatus}</p>
                <p className=""><span className="font-semibold text-cyan-400">Activity Level:</span> {userData?.personalInfo.activityLevel}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="col-span-3 col-start-1 row-span-2 row-start-4 font-mono text-gray-200 rounded-lg shadow-md sm:p-2 bg-teal-700/50 backdrop-blur-md calculated-results">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />) : (
          <>
            <h2 className="text-base font-bold h-1/5">CALCULATED RESULTS</h2>
            <div className="grid grid-cols-7 p-2 text-left sm:grid-cols-2 h-4/5">
              <div className="col-span-3 sm:col-span-1">
                <p className=""><span className="font-semibold text-cyan-400">Body Fat (%):</span> {userData?.results?.bodyFatUsNavy}</p>
                <p className=""><span className="font-semibold text-cyan-400">BMI:</span> {userData?.results?.bmi}</p>
                <p className="" ><span className="font-semibold text-cyan-400">BMR:</span> {userData?.results?.calorieNeed?.BMR} kcal</p>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <p className=""><span className="font-semibold text-cyan-400">Ideal Weight:</span> {userData?.results?.idealWeightRange}</p>
                <p className=""><span className="font-semibold text-cyan-400">Weight Status:</span> {userData?.results?.idealWeightStatus}</p>
                <p className=""><span className="font-semibold text-cyan-400">Daily Calorie Need :</span> {userData?.results?.calorieNeedByBodyGoal}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex h-full col-span-2 col-start-4 row-span-4 gap-10 px-4 py-2 font-mono text-gray-200 rounded-lg shadow-md bg-teal-700/50 backdrop-blur-md measurements">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <div className="flex justify-around w-full ">
            <BigLoader />
            <BigLoader />
          </div>
        ) : (
          <>
            <MeasurementsCard title="ACTUAL MEASUREMENTS" data={userData?.measurements} isEdiTable={true} name="actualMeasurements" className='' />
            <MeasurementsCard title="IDEAL MEASUREMENTS" data={userData?.idealMeasurements} isEdiTable={false} name="idealMeasurements" className='' />
          </>
        )}
      </div>
      <div className="flex-col hidden h-full col-span-1 col-start-6 row-span-4 p-2 font-mono text-gray-200 rounded-lg shadow-md sm:flex bg-slate-600/60">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <ProfileLoader />
        ) : (
          <PhotoDisplayComponent item={userRecords?.[0]} isEditable={true} willUpdateNow={true} className="w-40 h-40 mx-auto rounded-lg lg:w-full lg:h-full" />
        )}
      </div>
    </div>
  )
};

export default UserInfoComponent;
