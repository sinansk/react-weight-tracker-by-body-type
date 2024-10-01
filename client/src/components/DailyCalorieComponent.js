import { heights, weights, ages, bodyGoals, activityLevels } from "../data";
import { useSelector } from "react-redux";
import SelectInput from "./CommonComponents/SelectInput";
import CardComponent from "./CardComponent";
import GenderComponent from "./GetStartedComponents/GenderComponent";

const DailyCalorieComponent = ({ gender }) => {

  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;

  return (
    !userGender ? (
      <GenderComponent gender={gender} />
    ) : (
      <CardComponent gender={gender}>
        {gender === "male" ? (
          <>
            <form className="flex flex-col items-center justify-between h-full md:text-2xl">
              <SelectInput options={ages} label="Age" name="age" reduxName={`personalInfo`} />
              <SelectInput options={heights} label="Height" name="height" reduxName={`personalInfo`} />
              <SelectInput options={weights} label="Weight" name="weight" reduxName={`personalInfo`} />
              <SelectInput options={activityLevels} label="Activity Level" name="activityLevel" reduxName={`personalInfo`} />
            </form>
          </>
        ) : (
          <span className="flex flex-col items-center h-full">
            <h2 className="font-semibold xl:text-2xl">SET YOUR BODY GOAL</h2>
            <img
              className="md:my-4 h-1/3"
              src={require(`../assets/goal-${gender}.png`)}
              alt="washing-hands"
            />
            <p className="2xl:text-xl">
              Please set your body goal and we will calculate your daily calorie
              need!
            </p>
            <form className="text-center lg:mt-auto md:text-2xl">
              <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" reduxName={`personalInfo`} />
            </form>
          </span>
        )}
      </CardComponent>
    )
  );
};

export default DailyCalorieComponent;
