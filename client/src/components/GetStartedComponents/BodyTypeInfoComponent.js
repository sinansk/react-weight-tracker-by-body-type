import React from "react";
import { bodyTypes, bodyGoals } from "../../data";
import SelectInput from "../SelectInput";
import { useSelector } from "react-redux"
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
          <span className="flex flex-col items-center h-full">
            <h2 className="font-semibold xl:text-2xl">SET YOUR FRAME SIZE!</h2>
            <img
              className="md:my-4 h-1/3"
              src={require(`../../assets/washing-hands-${gender}.png`)}
              alt="washing-hands"
            />
            <p className="font-semibold">
              Please wrap your thumb and forefinger around your wrist in the
              area you normally wear a watch.
            </p>
            <form className="font-semibold text-center md:mt-4 lg:mt-auto">
              <SelectInput options={bodyTypes} label="My Fingers Are," name="bodyType" />
            </form>
          </span>
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
