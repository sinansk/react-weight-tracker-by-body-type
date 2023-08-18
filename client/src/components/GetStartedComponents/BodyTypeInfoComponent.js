import React from "react";
import { bodyTypes, bodyGoals, activityLevels } from "../../data";
import { useSelector } from "react-redux"
import SelectInput from "../CommonComponents/SelectInput";
const BodyTypeInfoComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;
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
          <h2 className="font-semibold xl:text-2xl">YOUR ACTIVITY LEVEL</h2>
          <img
            className="h-16 md:h-20 lg:h-44"
            src={require(`../../assets/fitness-${userGender}.png`)}
            alt="gender"
          />
          <p className="my-auto text-sm font-semibold md:text-md">
            Set your activity level based on your routin. We will use your info
            to calculate your ideal weight, body fat, daily calorie need and
            ideal body measurements. You can change this later!
          </p>
          <SelectInput className="mt-auto font-semibold" options={activityLevels} label="Activity Level" name="activityLevel" reduxName={'personalInfo'} />
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR BODY GOAL</h2>
          <img
            className="h-16 md:h-20 lg:h-44"
            src={require(`../../assets/goal-${userGender}.png`)}
            alt="washing-hands"
          />
          <p className="my-auto text-sm font-semibold md:text-md lg:text-lg">
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="font-semibold text-center lg:mt-auto">
            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" status="bodyGoalStatus" reduxName={'personalInfo'} />
          </form>
        </span>
      )}
    </div>
  );
};

export default BodyTypeInfoComponent;
