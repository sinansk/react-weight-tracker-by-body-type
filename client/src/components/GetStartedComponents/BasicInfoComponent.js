import React from "react";
import { useSelector } from "react-redux";
import { heights, weights, activityLevels, ages } from "../../data";
import "react-datepicker/dist/react-datepicker.css";
import SelectInput from "../SelectInput";

const BasicInfoComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;
  console.log(user);

  return (
    <div
      className={`card ${gender === "female"
        ? `red-card`
        : `blue-card`
        }
          `}
    >
      {gender === "male" ? (
        <>
          <form className="flex flex-col items-center h-full md:text-2xl justify-evenly">
            <SelectInput options={ages} label="Age" name="age" />
            <SelectInput options={heights} label="Height" name="height" />
            <SelectInput options={weights} label="Weight" name="weight" />
            <SelectInput options={activityLevels} label="Activity Level" name="activityLevel" />
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