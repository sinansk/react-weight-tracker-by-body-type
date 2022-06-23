import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { heights, bodyTypes, weights, fingersAroundWrist } from "../data";

const SmallContainer = ({ gender }) => {
  // const [selectedGender, setSelectedGender] = useState();
  const { selectedGender, setSelectedGender } = useUser();
  const { height, setHeight } = useState();
  const { weight, setWeight } = useState();
  const { bodyType, setBodyType } = useState();
  const handleGender = () => {
    !selectedGender && setSelectedGender(gender);
  };

  useEffect(() => {
    console.log(selectedGender);
  }, [selectedGender]);

  return (
    <div
      onClick={handleGender}
      className={`sm:h-96 sm:min-h-96 sm:w-1/2 sm:min-w-1/2 p-4 mx-4 flex flex-col items-center 1 border-2 rounded-xl ${
        gender === "female"
          ? `border-rose-500 text-rose-500`
          : `border-cyan-500 text-cyan-500`
      } `}
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
            <label htmlFor="bodyType" className="-mb-4">
              Body Type
            </label>
            <select
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              onBlur={(e) => setBodyType(e.target.value)}
            >
              {bodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {bodyType}
                </option>
              ))}
            </select>
            <label htmlFor="weight" className="-mb-4">
              Weight
            </label>
            <select
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
        </>
      ) : (
        <>
          <img
            className="h-1/3"
            src={require(`../assets/washing-hands-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please wrap your thumb and forefinger around your wrist in the area
            you normally wear a watch.
          </p>
          <form className="text-center  mt-5">
            <label htmlFor="bodyType" className="text-xl">
              My fingers are;
            </label>
            <select
              className="text-center"
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              onBlur={(e) => setBodyType(e.target.value)}
            >
              {fingersAroundWrist.map((fingers) => (
                <option key={fingers} value={fingers}>
                  {fingers}
                </option>
              ))}
            </select>
          </form>
        </>
      )}
    </div>
  );
};

export default SmallContainer;
