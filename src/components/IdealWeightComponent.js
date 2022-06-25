import { useUser } from "../context/UserContext";
import { heights, bodyTypes, weights } from "../data";

const IdealWeightComponent = ({ gender }) => {
  const {
    selectedGender,
    setSelectedGender,
    bodyType,
    setBodyType,
    weightInput,
    setWeightInput,
    heightInput,
    setHeightInput,
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
            <label htmlFor="height" className="-mb-4">
              Height
            </label>
            <select
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
              id="height"
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              onBlur={(e) => setHeightInput(e.target.value)}
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
              className="border-2 border-slate-400 rounded-lg outline-slate-500 w-full text-center"
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              onBlur={(e) => setBodyType(e.target.value)}
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
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              onBlur={(e) => setWeightInput(e.target.value)}
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

export default IdealWeightComponent;
