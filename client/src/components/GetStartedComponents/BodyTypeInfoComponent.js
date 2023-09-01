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
        ? `card-primary`
        : `card-secondary`
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
          <p className="my-auto text-xs font-semibold md:text-base">
            Set your activity level based on your routin. You can change this later!
          </p>
          <SelectInput className="mt-auto font-semibold" options={activityLevels} label="Activity Level" name="activityLevel" reduxName='personalInfo' />
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR BODY GOAL</h2>
          <img
            className="h-16 md:h-20 lg:h-44"
            src={require(`../../assets/goal-${userGender}.png`)}
            alt="washing-hands"
          />
          <p className="my-auto text-xs font-semibold md:text-base lg:text-lg">
            Please set your body goal. You can change this later!
          </p>
          <form className="font-semibold text-center lg:mt-auto">
            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" status="bodyGoalStatus" reduxName='personalInfo' />
          </form>
        </span>
      )}
    </div>
  );
};

export default BodyTypeInfoComponent;
