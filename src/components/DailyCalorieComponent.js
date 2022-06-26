import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { heights, weights, ages, bodyGoals, activityLevels } from "../data";

const DailyCalorieComponent = ({ gender }) => {
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

  const handleGender = () => {
    !selectedGender && setSelectedGender(gender);
  };

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
      {!selectedGender ? (
        <>
          <img
            className=""
            src={require(`../assets/${gender}.png`)}
            alt="gender"
          />
          <h2 className="text-5xl mt-4">{gender}</h2>
        </>
      ) : gender === selectedGender ? (
        <>
          <form className="flex flex-col items-center h-full justify-evenly text-2xl">
            <label htmlFor="ageInput" className=" -mb-4">
              Age
            </label>
            <select
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
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
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
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
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
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
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
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
            className="h-1/3 mt-4 mb-4"
            src={require(`../assets/goal-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="text-center mt-4">
            <label htmlFor="bodyGoal" className="text-xl">
              My goal is;
            </label>
            <select
              className="mr-5 text-center border-2 border-slate-400 rounded-lg outline-slate-500 w-full"
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
