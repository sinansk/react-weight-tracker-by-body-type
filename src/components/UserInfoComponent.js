import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBodyGoal } from "../redux/userRedux";
import { bodyGoals } from "../data";
import SelectInput from "./SelectInput";

const UserInfoComponent = () => {

  const userRecords = useSelector((state) => state.userRecords?.records)
  console.log("UserInfı", userRecords?.[0].personalInfo);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);

  return (

    <div className="grid grid-cols-7 grid-rows-2 gap-2 p-2 mx-8 border-2 border-red-500 rounded-sm h-96">
      <div className="row-span-2 border-2 border-indigo-500 rounded-sm">PHOTO</div>
      <div className="col-span-3 border-2 border-teal-500 rounded-sm">
        <h2 className="font-bold h-1/5">YOUR ACTUAL INFO</h2>
        <div className="grid grid-cols-2 h-4/5">
          <div>Age: {userRecords?.[0].personalInfo.age}</div>
          <div>Activity Level: {userRecords?.[0].personalInfo.activityLevel}</div>
          <div>Height: {userRecords?.[0].personalInfo.height}</div>
          <div>Weight: {userRecords?.[0].personalInfo.weight} </div>
          <div>Body Type: {userRecords?.[0].personalInfo.bodyType} </div>
          <div><SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" /></div>
        </div>
      </div>
      <div className="col-span-3 col-start-2 row-start-2 border-2 border-pink-500 rounded-sm">
        <h2 className="font-bold h-1/5">CALCULATED RESULTS</h2>
        <div className="grid h-full grid-cols-2">
          <div>Ideal Weight: {userRecords?.[0].results?.idealWeightRange}</div>
          <div>Weight Status: {userRecords?.[0].results?.idealWeightStatus}</div>
          <div>Body Fat: {userRecords?.[0].results?.bodyFat?.["Body Fat (U.S. Navy Method)"]}</div>
          <div>Ideal Body Fat Range: </div>
          <div>Daily Calorie Need: </div>
        </div>
      </div>
      <div className="col-span-3 col-start-5 row-span-2 border-2 rounded-sm border-amber-500 ">
        <div className="flex h-full">
          <div className="flex-1">
            <h2 className="font-bold">YOUR ACTUAL MEASUREMENTS</h2>
            {userRecords &&
              <ul className="grid">
                {Object.keys(userRecords?.[0].personalInfo).filter((key) =>
                  ["arm", "calve", "chest", "foreArm", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
                )
                  .sort()
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
                  {Object.keys(userRecords?.[0].idealMeasurements).sort().map((key) => (
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
    </div>


  );
};

export default UserInfoComponent;
