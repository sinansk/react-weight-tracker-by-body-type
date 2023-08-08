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
          <img
            className="h-20 mb-4 md:h-20 lg:h-44"
            src={require(`../../assets/fitness-${userGender}.png`)}
            alt="gender"
          />
          <h2>
            Set your activity level based on your routin. We will use your info
            to calculate your ideal weight, body fat, daily calorie need and
            ideal body measurements. You can change this later!
          </h2>
          <SelectInput className="mt-auto font-semibold" options={activityLevels} label="Activity Level" name="activityLevel" />
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR BODY GOAL</h2>
          <img
            className="md:my-4 h-1/3"
            src={require(`../../assets/goal-${userGender}.png`)}
            alt="washing-hands"
          />
          <p className="font-semibold">
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="font-semibold text-center lg:mt-auto">
            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" status="bodyGoalStatus" />
          </form>
        </span>
      )}
    </div>
  );
};

export default BodyTypeInfoComponent;
