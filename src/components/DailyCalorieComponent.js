import { heights, weights, ages, bodyGoals, activityLevels } from "../data";
import { useDispatch, useSelector } from "react-redux";
import {
  setAge,
  setHeight,
  setWeight,
  selectGender,
  setActivityLevel,
  setBodyGoal,
} from "../redux/userRedux";
import SelectInput from "./SelectInput";

const DailyCalorieComponent = ({ gender }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userGender = user.personalInfo.gender;
  console.log(user);
  const bodyType = useSelector((state) => state.user.personalInfo.bodyType);
  console.log(bodyType)
  const handleGender = () => {
    !userGender && dispatch(selectGender(gender));
  };

  return (
    <div
      onClick={handleGender}
      className={`h-60 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${gender === "female"
        ? `border-rose-500 text-rose-500 bg-rose-50`
        : `border-cyan-500 text-cyan-500 bg-cyan-50`
        }
          `}
    >
      {!userGender ? (
        <div className="w-full h-full cursor-pointer">
          <img
            className="h-40 m-auto md:h-68 lg:h-96 xl:h-72"
            src={require(`../assets/${gender}.png`)}
            alt="gender"
          />
          <h2 className="mt-2 text-5xl sm:mt-4">{gender}</h2>
        </div>
      ) : gender === "male" ? (
        <>
          <form className="flex flex-col items-center justify-between h-full md:text-2xl">
            <SelectInput options={ages} label="Age" name="age" />
            <SelectInput options={heights} label="Height" name="height" />
            <SelectInput options={weights} label="Weight" name="weight" />
            <SelectInput options={activityLevels} label="Activity Level" name="activityLevel" />
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
          <p>
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="text-center lg:mt-auto md:text-2xl">
            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" />
          </form>
        </span>
      )}
    </div>
  );
};

export default DailyCalorieComponent;
