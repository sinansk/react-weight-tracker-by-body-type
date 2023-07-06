import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../redux/userRedux";
import { activityLevels, ages, bodyGoals, bodyTypes, heights, weights } from "../data";
import SelectInput from "./SelectInput";
import EditButton from "./EditButton";

import Modal from "./Modal";

import { addUserInfo } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { fetchUserInfo } from "../redux/userRecordsThunk";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight, updateIdealMeasurements } from "../redux/userInfoThunk";
import LoadingComponent from "./LoadingComponent";

const UserInfoComponent = () => {

  const userRecords = useSelector((state) => state.userRecords?.records)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser);
  const measurements = Object.keys(userRecords?.[0].personalInfo).filter((key) =>
    ["arm", "calve", "chest", "foreArm", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
  ).sort()
  const idealMeasurements = Object.keys(userRecords?.[0].idealMeasurements).sort()
  const [measurementsData, setMeasurementsData] = useState(userRecords?.[0].personalInfo);
  const isLoading = currentUser.status

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
  const updateHandle = async (e) => {
    if (e.target.name === "actualInfo") {
      dispatch(fetchIdealWeight())
      dispatch(fetchCalorieNeed())
    } else if (e.target.name === "actualMeasurements") {
      dispatch(fetchBodyFat())
      dispatch(updateIdealMeasurements())
    }
    // await addUserInfo({
    //   date: serverTimestamp(),
    //   uid: user.currentUser.uid,
    //   personalInfo: user.data.personalInfo,
    //   idealMeasurements: user.data?.idealMeasurements,
    //   results: user.data.results,
    // });

  }


  return (
    (isLoading === "loading" || isLoading === "idle" || userRecords.length === 0) ? (
      <LoadingComponent />
    ) : (
      <div className="grid grid-cols-7 grid-rows-2 gap-2 p-2 mx-8 border-2 border-red-500 rounded-sm h-96">
        <div className="row-span-2 border-2 border-indigo-500 rounded-sm">PHOTO</div>
        <div className="col-span-3 border-2 border-teal-500 rounded-sm">
          <div className="flex items-center justify-center text-center">
            <h2 className="flex items-center justify-center font-bold h-1/5">YOUR ACTUAL INFO</h2>
            <EditButton styleProps={`ml-1 `} onClick={handleActualInfoModal} />
            <Modal ref={actualInfoModal} styleProps={`w-96 h-96 `}>
              <div className="grid grid-cols-2 h-4/5">

                <div><SelectInput options={ages} label="Age," name="age" /></div>
                <div><SelectInput options={bodyTypes} label="My fingers are," name="bodyType" /></div>
                <div><SelectInput options={heights} label="Height" name="height" /></div>
                <div><SelectInput options={activityLevels} label="Activity Level:" name="activityLevel" /> </div>
                <div><SelectInput options={weights} label="Weight" name="weight" /></div>
                <div><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" /></div>
              </div>
              <button className="bg-indigo-700 px-1 py-2.5 text-white hover:bg-indigo-500 rounded-sm" name="actualInfo" onClick={updateHandle}>UPDATE</button>
            </Modal>
            {/* </Modal>
          <EditButton styleProps={`ml-auto `} onClick={handleActualInfoModal} />
          <Modal ref={actualInfoModal} styleProps={`w-96 h-96 `} >

            {/* <div>Activity Level: {userRecords?.[0].personalInfo.activityLevel}</div> */}
            {/* <div>Height: {userRecords?.[0].personalInfo.height}</div> */}
            {/* <div>Weight: {userRecords?.[0].personalInfo.weight} </div> */}
            {/* <div>Body Type: {userRecords?.[0].personalInfo.bodyType} </div> */}
            {/* <label htmlFor="height" clasclassNames="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Weight</label>
            <input id="height" className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" value={userRecords?.[0].personalInfo.height} name="height" onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
            <label htmlFor="weight" clasclassNames="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Weight</label>
            <input id="weight" className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" value={userRecords?.[0].personalInfo.weight} name="weight" onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
            <label htmlFor="age" clasclassNames="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Age</label>
            <input id="age" className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" value={userRecords?.[0].personalInfo.age} name="age" onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
            <div><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" /></div>
          */}

          </div>
          <div className="grid grid-cols-2 h-4/5">
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Age:</span> {userRecords?.[0].personalInfo.age}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Activity Level:</span> {userRecords?.[0].personalInfo.activityLevel}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Height:</span> {userRecords?.[0].personalInfo.height + ` cm`}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Weight:</span> {userRecords?.[0].personalInfo.weight + ` kg`} </div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Body Type:</span> {userRecords?.[0].personalInfo.bodyType} </div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Body Goal:</span> {userRecords?.[0].personalInfo.bodyGoalStatus} </div>
          </div>
        </div>
        <div className="col-span-3 col-start-2 row-start-2 border-2 border-pink-500 rounded-sm">
          <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
          <div className="grid h-full grid-cols-2">
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Ideal Weight:</span> {userRecords?.[0].results?.idealWeightRange}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Weight Status:</span> {userRecords?.[0].results?.idealWeightStatus}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Body Fat (%):</span> {userRecords?.[0].results?.bodyFat?.["Body Fat (U.S. Navy Method)"]}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">BMI:</span>{userRecords?.[0].results?.bmi}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">Daily Calorie Need:</span> {userRecords?.[0].results?.calorieNeedByBodyGoal}</div>
            <div className="border-[0.5px] border-stone-400"><span className="font-semibold text-indigo-600">BMR:</span> {userRecords?.[0].results?.calorieNeed.BMR} kcal</div>
          </div>
        </div>
        <div className="flex h-full col-span-3 col-start-5 row-span-2 border-2 rounded-sm border-amber-500 ">
          <div className="flex-1">
            <div className="flex items-center justify-center text-center">
              <h2 className="font-bold">YOUR ACTUAL MEASUREMENTS</h2>
              <EditButton styleProps={`ml-1 `} onClick={handleEditClick} />
              <Modal ref={modalRef} styleProps={``}>
                <ul className="grid">
                  {measurements
                    .map((key) => (
                      <li key={key}>
                        <span>{key}: </span>
                        <input className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" value={measurements[key]} name={key} onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
                      </li>
                    ))}
                </ul>
                <button className="bg-indigo-700 px-1 py-2.5 text-white hover:bg-indigo-500 rounded-sm" name="actualMeasurements" onClick={updateHandle}>UPDATE</button>
              </Modal>
            </div>
            {userRecords &&
              <ul className="grid">
                {measurements
                  .map((key) => (
                    <li key={key}>
                      <span>{key}: </span>
                      <span>{userRecords?.[0].personalInfo[key]}</span>
                    </li>
                  ))}
              </ul>
            }
          </div>
          <div className="flex-1">
            <h2 className="font-bold">YOUR IDEAL MEASUREMENTS</h2>
            <div className="grid">
              {userRecords[0]?.idealMeasurements &&
                <ul className="grid">
                  {idealMeasurements.map((key) => (
                    <li key={key}>
                      <span>{key}: </span>
                      <span>{userRecords?.[0].idealMeasurements?.[key]}</span>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>

        </div>
      </div>
    )

  );
};

export default UserInfoComponent;
