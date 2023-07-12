import React, { useRef, useState, useEffect } from "react";
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
import MeasurementsCard from "./MeasurementsCard";

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
      try {
        await Promise.all([
          dispatch(fetchIdealWeight()),
          dispatch(fetchCalorieNeed()),
        ]);
        await syncData();
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.name === "actualMeasurements") {
      try {
        await dispatch(fetchBodyFat());
        console.log("dispatchFetchBodyFat çalıştı");
        await dispatch(updateIdealMeasurements());
        console.log("dispatchUpdateIdealMeasurement çalıştı");
        await syncData();
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
      modalRef.current.closeModal(); // Modal'ı kapat
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
    (isLoading === "loading" || isLoading === "idle" || userRecords.length === 0) ? (
      <LoadingComponent />
    ) : (
      <div ref={bottomRef} className="grid grid-cols-7 grid-rows-2 gap-2 p-2 mx-8 h-96">
        <div className="row-span-2 rounded-lg shadow-md bg-slate-50 ">PHOTO</div>
        <div className="relative col-span-3 col-start-2 row-start-1 p-2 rounded-lg shadow-md bg-slate-50">

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
            <div className=""><span className="font-semibold text-indigo-600">Age:</span> {userRecords?.[0].data.personalInfo.age}</div>
            <div className=""><span className="font-semibold text-indigo-600">Body Type:</span> {userRecords?.[0].data.personalInfo.bodyType} </div>
            <div className=""><span className="font-semibold text-indigo-600">Height:</span> {userRecords?.[0].data.personalInfo.height + ` cm`}</div>
            <div className=""><span className="font-semibold text-indigo-600">Body Goal:</span> {userRecords?.[0].data.personalInfo.bodyGoalStatus} </div>
            <div className=""><span className="font-semibold text-indigo-600">Weight:</span> {userRecords?.[0].data.personalInfo.weight + ` kg`} </div>
            <div className=""><span className="font-semibold text-indigo-600">Activity Level:</span> {userRecords?.[0].data.personalInfo.activityLevel}</div>
          </div>
        </div>
        <div className="col-span-3 col-start-2 row-start-2 p-2 rounded-lg shadow-md bg-slate-50">
          <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
          <div className="grid grid-cols-2 p-2 text-left h-4/5">
            <div className=""><span className="font-semibold text-indigo-600">Ideal Weight:</span> {userRecords?.[0].data.results?.idealWeightRange}</div>
            <div className=""><span className="font-semibold text-indigo-600">Weight Status:</span> {userRecords?.[0].data.results?.idealWeightStatus}</div>
            <div className=""><span className="font-semibold text-indigo-600">Body Fat (%):</span> {userRecords?.[0].data.results?.bodyFat?.["Body Fat (U.S. Navy Method)"]}</div>
            <div className=""><span className="font-semibold text-indigo-600">BMI:</span>{userRecords?.[0].data.results?.bmi}</div>
            <div className=""><span className="font-semibold text-indigo-600">Daily Calorie Need:</span> {userRecords?.[0].data.results?.calorieNeedByBodyGoal}</div>
            <div className="" ><span className="font-semibold text-indigo-600">BMR:</span> {userRecords?.[0].data.results?.calorieNeed?.BMR} kcal</div>
          </div>
        </div>
        <div className="flex h-full col-span-3 col-start-5 row-span-2 p-2 rounded-lg shadow-md bg-slate-50">
          <MeasurementsCard title="YOUR ACTUAL MEASUREMENTS" data={userRecords?.[0].data.personalInfo} isEdiTable={true} />
          <MeasurementsCard title="YOUR IDEAL MEASUREMENTS" data={userRecords?.[0].data.idealMeasurements} isEdiTable={false} />
          {/* <div className="flex-1">
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
                      <span>{userRecords?.[0].data.personalInfo[key]}</span>
                    </li>
                  ))}
              </ul>
            }
          </div>
          <div className="flex-1">
            <h2 className="font-bold">YOUR IDEAL MEASUREMENTS</h2>
            <div className="grid">
              {userRecords[0]?.data.idealMeasurements &&
                <ul className="grid">
                  {idealMeasurements.map((key) => (
                    <li key={key}>
                      <span>{key}: </span>
                      <span>{userRecords?.[0].data.idealMeasurements?.[key]}</span>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div> */}

        </div>
      </div>
    )

  );
};

export default UserInfoComponent;
