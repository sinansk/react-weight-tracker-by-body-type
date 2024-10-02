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
  const user = useSelector((state) => state.user);
  const userRecords = useSelector((state) => state.userRecords?.records);
  const userData = userRecords?.[0].data;
  const isLoading = user.status;
  const userRecordsStatus = useSelector((state) => state.userRecords.status);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = bottomRef.current.getBoundingClientRect();
      const bottomPosition = window.innerHeight - top;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bottomRef}
      className="flex flex-col gap-2 p-2 text-sm sm:text-base lg:grid lg:grid-cols-6 lg:grid-rows-5 lg:mx-20 lg:h-96"
    >
      <button
        onClick={() => createModal("AddNewRecordModal")}
        title="Add Body Record"
        type="button"
        className="flex items-center justify-center col-span-6 gap-5 text-xs rounded-lg shadow-md new-record text-gray-100 lg:text-xl bg-cyan-400/90 hover:bg-cyan-400 backdrop-blur-md"
      >
        <AiOutlineCloudUpload className="w-8 h-8 lg:w-14 lg:h-14" />
        <h3 className="font-bold">Add New Record</h3>
        <AiOutlineCloudUpload className="w-8 h-8 lg:w-14 lg:h-14" />
        {/* <h2 className="hidden sm:block">Welcome <span className="font-semibold underline ">{user.currentUser.email}</span> You are our member .</h2>
        <SiAddthis className="absolute hidden my-auto text-2xl cursor-pointer sm:block sm:right-8 hover:text-gray-200 " onClick={() => createModal("UpdateProfileModal")} title="Add Body Record" /> */}
      </button>
      <div className="relative col-span-3 col-start-1 font-semibold row-span-2 row-start-2 font-mono text-gray-100 rounded-lg shadow-md p-2 sm:p-4 bg-gray-700/70 hover:bg-gray-800/40 backdrop-blur-md actual-info">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />
        ) : (
          <>
            <h2 className="text-sm font-bold lg:text-base h-1/5">
              ACTUAL INFO
            </h2>
            {/* <EditButton styleProps={`absolute right-1 top-1`} onClick={() => createModal("UserInfoModal", { willOpenModal: "MeasurementsModal" })} size={20} /> */}
            <div className="grid grid-cols-7 p-2 text-xs text-left lg:text-base sm:grid-cols-2 h-4/5">
              <div className="col-span-3 sm:col-span-1">
                <p className="">
                  <span className="font-semibold ">Age:</span>{" "}
                  {userData?.personalInfo.age}
                </p>
                <p className="">
                  <span className="font-semibold ">Height:</span>{" "}
                  {userData?.personalInfo.height + ` cm`}
                </p>
                <p className="">
                  <span className="font-semibold ">Weight:</span>{" "}
                  {userData?.personalInfo.weight + ` kg`}
                </p>
              </div>
              <div className="col-span-4 sm:col-span-1 ">
                <p className="">
                  <span className="font-semibold ">Body Type:</span>{" "}
                  {userData?.personalInfo.bodyType}
                </p>
                <p className="">
                  <span className="font-semibold ">Body Goal:</span>{" "}
                  {userData?.personalInfo.bodyGoalStatus}
                </p>
                <p className="">
                  <span className="font-semibold ">Activity:</span>{" "}
                  {userData?.personalInfo.activityLevel}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="col-span-3 col-start-1 row-span-2 row-start-4 font-mono font-semibold text-gray-100 rounded-lg shadow-md p-2 sm:p-4 bg-sky-700/95 hover:bg-sky-700/80 backdrop-blur-md  calculated-results">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <UserInfoLoader />
        ) : (
          <>
            <h2 className="text-sm font-bold lg:text-base h-1/5 ">
              CALCULATED RESULTS
            </h2>
            <div className="grid grid-cols-7 p-2 text-xs text-left lg:text-base sm:grid-cols-2 h-4/5 gap-1">
              <div className="col-span-3 sm:col-span-1">
                <p className="">
                  <span className="font-semibold ">Body Fat (%):</span>{" "}
                  {userData?.results?.bodyFatUsNavy}
                </p>
                <p className="">
                  <span className="font-semibold ">BMI:</span>{" "}
                  {userData?.results?.bmi}
                </p>
                <p className="">
                  <span className="font-semibold ">BMR:</span>{" "}
                  {userData?.results?.calorieNeed?.BMR} kcal
                </p>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <p className="">
                  <span className="font-semibold ">Ideal Weight:</span>{" "}
                  {userData?.results?.idealWeightRange}
                </p>
                <p className="">
                  <span className="font-semibold ">Status:</span>{" "}
                  {userData?.results?.idealWeightStatus}
                </p>
                <p className="">
                  <span className="font-semibold ">Calorie Need :</span>{" "}
                  {userData?.results?.calorieNeedByBodyGoal}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex h-full col-span-2 col-start-4 row-span-4 gap-10 p-4 font-mono text-xs text-gray-100 rounded-lg shadow-md lg:text-base bg-cyan-600/50 hover:bg-cyan-600/60 backdrop-blur-md measurements">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <div className="flex justify-around w-full ">
            <BigLoader />
            <BigLoader />
          </div>
        ) : (
          <>
            <MeasurementsCard
              title="ACTUAL"
              data={userData?.measurements}
              isEdiTable={true}
              name="actualMeasurements"
              className="p-4"
            />
            <MeasurementsCard
              title="IDEAL"
              data={userData?.idealMeasurements}
              isEdiTable={false}
              name="idealMeasurements"
              className="p-4"
            />
          </>
        )}
      </div>
      <div className="flex-col hidden h-full col-span-1 col-start-6 row-span-4 p-2 font-mono text-gray-200 rounded-lg shadow-md sm:flex bg-slate-600/60">
        {isLoading === "loading" || userRecordsStatus === "loading" ? (
          <ProfileLoader />
        ) : (
          <PhotoDisplayComponent
            item={userRecords?.[0]}
            isEditable={true}
            willUpdateNow={true}
            className="w-40 h-40 mx-auto rounded-lg lg:w-full lg:h-full"
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoComponent;
