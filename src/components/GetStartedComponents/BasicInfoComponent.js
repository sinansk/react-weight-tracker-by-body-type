import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGender } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { heights, weights, activityLevels, ages } from "../../data";
import {
  setBodyType,
  setWeight,
  setHeight,
  setActivityLevel,
  setUserBirthday,
} from "../../redux/userRedux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectInput from "../SelectInput";

const BasicInfoComponent = ({ gender }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userGender = user.personalInfo.gender;
  console.log(user);
  const bodyType = useSelector((state) => state.user.personalInfo.bodyType);
  const handleGender = () => {
    // navigate("/idealweight", { replace: true });
  };
  const [date, setDate] = useState(new Date());
  return (
    <div
      className={`h-72 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${gender === "female"
        ? `border-rose-500 text-rose-500 bg-rose-50`
        : `border-cyan-500 text-cyan-500 bg-cyan-50`
        }`}
    >
      {gender === "male" ? (
        <>
          <form className="flex flex-col items-center h-full md:text-2xl justify-evenly">
            <SelectInput options={ages} label="Age" name="age" />
            <SelectInput options={heights} label="Height" name="height" />
            <SelectInput options={weights} label="Weight" name="weight" />
            <SelectInput options={activityLevels} label="Activity Level" name="activityLevel" />
            {/* <label htmlFor="birthday" className="-mb-1">
              Birthday
            </label>
            <DatePicker
              className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="birthday"
              selected={date}
              onChange={(date) => dispatch(setUserBirthday(date))}
            />
            <label htmlFor="height" className="-mb-1">
              Height
            </label>
            <select
              className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="height"
              value={user.personalInfo.height ? user.personalInfo.height : 169}
              onChange={(e) => dispatch(setHeight(e.target.value))}
              onBlur={(e) => dispatch(setHeight(e.target.value))}
            >
              {heights.map((height) => (
                <option key={height} value={height}>
                  {height}
                </option>
              ))}
            </select>

            <label htmlFor="weight" className="-mb-1">
              Weight
            </label>
            <select
              className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="weight"
              value={user.personalInfo.weight ? user.personalInfo.weight : 60}
              onChange={(e) => dispatch(setWeight(e.target.value))}
              onBlur={(e) => dispatch(setWeight(e.target.value))}
            >
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
            <label htmlFor="activityLevel" className="-mb-1">
              Activity Level
            </label>
            <select
              className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="activityLevel"
              value={
                user.personalInfo.activityLevel
                  ? user.personalInfo.activityLevel
                  : "level_1"
              }
              onChange={(e) => dispatch(setActivityLevel(e.target.value))}
              onBlur={(e) => dispatch(setActivityLevel(e.target.value))}
            >
              {activityLevels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.status}
                </option>
              ))}
            </select> */}
          </form>
        </>
      ) : (
        <>
          <img
            className="h-20 mb-4 md:h-40 lg:h-44"
            src={require(`../../assets/fitness-${userGender}.png`)}
            alt="gender"
          />
          <h2>
            Set your activity level based on your routin. We will use your info
            to calculate your ideal weight, body fat, daily calorie need and
            ideal body measurements. You can change this later!
          </h2>
        </>
      )}
    </div>
  );
};

export default BasicInfoComponent;
