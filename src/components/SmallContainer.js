import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { heights, bodyTypes, weights } from "../data";

const SmallContainer = ({ gender }) => {
  const {
    selectedGender,
    setSelectedGender,
    bodyType,
    setBodyType,
    weight,
    setWeight,
    height,
    setHeight,
  } = useUser();

  const handleGender = () => {
    !selectedGender && setSelectedGender(gender);
  };
  console.log(gender);
  useEffect(() => {
    console.log(selectedGender);
  }, [selectedGender]);

  useEffect(() => {
    console.log({ bodyType });
  }, [bodyType]);

  const [onFocused, setOnFocused] = useState();

  useEffect(() => {
    console.log(onFocused);
  }, [onFocused]);

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
            <label htmlFor="height" className="-mb-4">
              Height
            </label>
            <select
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onBlur={(e) => setHeight(e.target.value)}
            >
              {heights.map((height) => (
                <option key={height} value={height}>
                  {height}
                </option>
              ))}
            </select>

            <label htmlFor="bodyType" className="-mb-4 ">
              Body Type
            </label>
            <select
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full w-full text-center"
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              onBlur={(e) => setBodyType(e.target.value)}
              onClick={() => setOnFocused(gender)}
              // onClickCapture={() => setOnFocused()}
            >
              {bodyTypes.map((bodyType) => (
                <option key={bodyType.value} value={bodyType.value}>
                  {bodyType.value}
                </option>
              ))}
            </select>

            <label htmlFor="weight" className="-mb-4">
              Weight
            </label>
            <select
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={(e) => setWeight(e.target.value)}
            >
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </form>
          {/* <svg
            className=" h-8 w-8 text-rose-500 justify-self-center self-end "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWinejoin="round"
              strokeWidth="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="text-2xl">LEARN YOUR BODY TYPE!</h2>
          <img
            className="h-1/3 mt-4 mb-4"
            src={require(`../assets/washing-hands-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please wrap your thumb and forefinger around your wrist in the area
            you normally wear a watch.
          </p>
          <form className="text-center mt-4">
            <label htmlFor="wristSize" className="text-xl">
              My fingers are;
            </label>
            <select
              className="mr-5 text-center border-2 border-slate-400 rounded-lg outline-slate-500 w-full"
              id="wristSize"
              value={bodyType}
              onChange={(e) => {
                setBodyType(e.target.value);
              }}
              onBlur={(e) => {
                setBodyType(e.target.value);
              }}
            >
              {bodyTypes.map((bodyType) => (
                <option key={bodyType.sitution} value={bodyType.value}>
                  {bodyType.sitution}
                </option>
              ))}
            </select>
          </form>
        </span>
      )}
    </div>
  );
};

export default SmallContainer;
