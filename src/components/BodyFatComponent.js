import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { heights, weights, ages, neck, waist, hip } from "../data";
import { publicRequest } from "../requestMethods";

const BodyFatComponent = ({ gender }) => {
  const {
    selectedGender,
    setSelectedGender,
    weightInput,
    setWeightInput,
    heightInput,
    setHeightInput,
    ageInput,
    setAgeInput,
    neckInput,
    setNeckInput,
    waistInput,
    setWaistInput,
    hipInput,
    setHipInput,
    userHeight,
    userWeight,
  } = useUser();

  const handleGender = () => {
    !selectedGender && setSelectedGender(gender);
  };

  return (
    <div
      onClick={handleGender}
      className={` sm:h-96 w-1/2 h-full p-4 mx-4 flex flex-col items-center 1 border-2 rounded-xl ${
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
          <form className="flex flex-row flex-1 items-center h-full text-2xl">
            <div className="flex flex-col justify-evenly h-full w-full px-4">
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

              <label htmlFor="heightInput" className="-mb-4">
                Height
              </label>
              <select
                className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
                id="heightInput"
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
              <label htmlFor="weightInput" className="-mb-4">
                Weight
              </label>
              <select
                className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
                id="weightInput"
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
            </div>
            <div className="flex flex-col justify-evenly px-4 h-full w-full">
              <label htmlFor="neckInput" className="-mb-4">
                Neck;
              </label>
              <select
                className="mr-5 text-center border-2 border-slate-400 rounded-lg outline-slate-500 w-full"
                id="neckInput"
                value={neckInput}
                onChange={(e) => {
                  setNeckInput(e.target.value);
                }}
                onBlur={(e) => {
                  setNeckInput(e.target.value);
                }}
              >
                {neck.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="waistInput" className="-mb-4">
                Waist;
              </label>
              <select
                className="mr-5 text-center border-2 border-slate-400 rounded-lg outline-slate-500 w-full"
                id="waistInput"
                value={waistInput}
                onChange={(e) => {
                  setWaistInput(e.target.value);
                }}
                onBlur={(e) => {
                  setWaistInput(e.target.value);
                }}
              >
                {waist.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="hipInput" className="-mb-4">
                Hip;
              </label>
              <select
                className="mr-5 text-center border-2 border-slate-400 rounded-lg outline-slate-500 w-full"
                id="hipInput"
                value={hipInput}
                onChange={(e) => {
                  setHipInput(e.target.value);
                }}
                onBlur={(e) => {
                  setHipInput(e.target.value);
                }}
              >
                {hip.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="text-2xl">MEASURE YOUR BODY!</h2>
          <img
            className="h-2/5 mt-4 mb-4"
            src={require(`../assets/body-${selectedGender}.png`)}
            alt="washing-hands"
          />
          <p className="text-lg">
            Please measure your neck at widest point, your waist over belly
            button and your hip over largest point with a tape measure.
          </p>
        </span>
      )}
    </div>
  );
};

export default BodyFatComponent;
