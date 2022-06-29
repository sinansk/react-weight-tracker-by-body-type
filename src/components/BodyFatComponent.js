import { heights, weights, ages, neck, waist, hip } from "../data";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGender,
  setAge,
  setHeight,
  setWeight,
  setNeck,
  setWaist,
  setHip,
} from "../redux/userRedux";

const BodyFatComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const measurements = user.measurements;
  const userGender = user.userGender;
  console.log(user.waistSize);
  console.log(userGender);
  const dispatch = useDispatch();
  const handleGender = () => {
    !userGender && dispatch(selectGender(gender));
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
          <form className="flex flex-row items-center flex-1 h-full text-2xl">
            <div className="flex flex-col w-full h-full px-4 justify-evenly">
              <label htmlFor="ageInput" className="-mb-4 ">
                Age
              </label>
              <select
                className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="ageInput"
                value={user.age ? user.age : 29}
                onChange={(e) => dispatch(setAge(e.target.value))}
                onBlur={(e) => dispatch(setAge(e.target.value))}
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
                className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="heightInput"
                value={user.height ? user.height : 169}
                onChange={(e) => dispatch(setHeight(e.target.value))}
                onBlur={(e) => dispatch(setHeight(e.target.value))}
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
                className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="weightInput"
                value={user.weight ? user.weight : 60}
                onChange={(e) => dispatch(setWeight(e.target.value))}
                onBlur={(e) => dispatch(setWeight(e.target.value))}
              >
                {weights.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full h-full px-4 justify-evenly">
              <label htmlFor="neckInput" className="-mb-4">
                Neck;
              </label>
              <select
                className="w-full mr-5 text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="neckInput"
                value={measurements.neckSize ? measurements.neckSize : 34}
                onChange={(e) => {
                  dispatch(setNeck(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setNeck(e.target.value));
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
                className="w-full mr-5 text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="waistInput"
                value={measurements.waistSize ? measurements.waistSize : 70}
                onChange={(e) => {
                  dispatch(setWaist(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setWaist(e.target.value));
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
                className="w-full mr-5 text-center border-2 rounded-lg border-slate-400 outline-slate-500"
                id="hipInput"
                value={measurements.hipSize ? measurements.hipSize : 90}
                onChange={(e) => {
                  dispatch(setHip(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setHip(e.target.value));
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
            className="mt-4 mb-4 h-2/5"
            src={require(`../assets/body-${userGender}.png`)}
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
