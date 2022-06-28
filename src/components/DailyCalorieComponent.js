import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { heights, weights, ages, bodyGoals, activityLevels } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, selectGender } from "../redux/userRedux";

const DailyCalorieComponent = ({ gender }) => {
  const userGender = useSelector((state) => state.user.userGender);
  const dispatch = useDispatch();
  const handleGender = () => {
    !userGender && dispatch(selectGender(gender));
  };
  const {
    selectedGender,
    setSelectedGender,
    weightInput,
    setWeightInput,
    heightInput,
    setHeightInput,
    activityLevel,
    setActivityLevel,
    bodyGoal,
    setBodyGoal,
    userHeight,
    userWeight,
    ageInput,
    setAgeInput,
  } = useUser();

  return (
    <div
      onClick={handleGender}
      className={`sm:h-96 sm:min-h-96 sm:w-1/2 sm:min-w-1/2 p-4 mx-4 flex flex-col items-center 1 border-2 rounded-xl ${
        gender === "female"
          ? `border-rose-500 text-rose-500 bg-rose-50`
          : `border-cyan-500 text-cyan-500 bg-cyan-50`
      }
          `}
    >
      {!userGender ? (
        <>
          <img
            className=""
            src={require(`../assets/${gender}.png`)}
            alt="gender"
          />
          <h2 className="mt-4 text-5xl">{gender}</h2>
        </>
      ) : gender === userGender ? (
        <>
          <form className="flex flex-col items-center h-full text-2xl justify-evenly">
            <label htmlFor="ageInput" className="-mb-4 ">
              Age
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="ageInput"
              value={ageInput ? ageInput : 29}
              onChange={(e) => setAgeInput(e.target.value)}
              onBlur={(e) => setAgeInput(e.target.value)}
            >
              {ages.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>

            <label htmlFor="height" className="-mb-4">
              Height
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="height"
              value={userHeight ? userHeight : heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              onBlur={(e) => setHeightInput(e.target.value)}
            >
              {heights.map((height) => (
                <option key={height} value={height}>
                  {height}
                </option>
              ))}
            </select>

            <label htmlFor="weight" className="-mb-4">
              Weight
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="weight"
              value={userWeight ? userWeight : weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              onBlur={(e) => setWeightInput(e.target.value)}
            >
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>

            <label htmlFor="activityLevel" className="-mb-4 ">
              Activity Level
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="activityLevel"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              onBlur={(e) => setActivityLevel(e.target.value)}
            >
              {activityLevels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.sitution}
                </option>
              ))}
            </select>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="text-2xl">SET YOUR BODY GOAL</h2>
          <img
            className="mt-4 mb-4 h-1/3"
            src={require(`../assets/goal-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="mt-4 text-center">
            <label htmlFor="bodyGoal" className="text-xl">
              My goal is;
            </label>
            <select
              className="w-full mr-5 text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="bodyGoal"
              value={bodyGoal}
              onChange={(e) => {
                setBodyGoal(e.target.value);
              }}
              onBlur={(e) => {
                setBodyGoal(e.target.value);
              }}
            >
              {bodyGoals.map((item) => (
                <option key={item.sitution} value={item.value}>
                  {item.sitution}
                </option>
              ))}
            </select>
          </form>
        </span>
      )}
    </div>
  );
};

export default DailyCalorieComponent;
