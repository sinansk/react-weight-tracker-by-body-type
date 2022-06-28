import { useUser } from "../context/UserContext";
import { heights, bodyTypes, weights, wrist } from "../data";

const IdealMeasurementsComponent = ({ gender }) => {
  const { selectedGender, setSelectedGender, wristInput, setWristInput } =
    useUser();

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
          <h2 className="mt-4 text-5xl">{gender}</h2>
        </>
      ) : gender === selectedGender ? (
        <>
          <form className="flex flex-col items-center h-full text-2xl justify-evenly">
            <img
              className="mt-4 mb-4 h-1/3"
              src={require(`../assets/wrist-${gender}.png`)}
              alt="washing-hands"
            />
            <p className="text-sm">
              Please measure your wrist circumference with a tape measure in the
              area you normally wear a watch.
            </p>

            <label htmlFor="wristSize" className="-mb-4">
              Wrist Size
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="wristSize"
              value={wristInput}
              onChange={(e) => setWristInput(e.target.value)}
              onBlur={(e) => setWristInput(e.target.value)}
            >
              {wrist.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full justify-evenly">
          <h2 className="text-2xl">LEARN YOUR IDEAL MEASUREMENTS!</h2>
          <p>
            The calculation is based on John McCallum’s formula who is a famous
            methodist. This formula is widely used because there is a good
            correlation between the wrist and the other body areas. The targets
            might look a little challenging at first but according to many
            studies, they are realistic.
          </p>
        </span>
      )}
    </div>
  );
};

export default IdealMeasurementsComponent;
