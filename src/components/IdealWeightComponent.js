import { heights, bodyTypes, weights } from "../data";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGender,
  setBodyType,
  setWeight,
  setHeight,
} from "../redux/userRedux";

const IdealWeightComponent = ({ gender }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userGender = user.userGender;
  console.log(user);
  const bodyType = useSelector((state) => state.user.bodyType);
  const handleGender = () => {
    !userGender && dispatch(selectGender(gender));
  };

  return (
    <div
      onClick={handleGender}
      className={`h-60 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${
        gender === "female"
          ? `border-rose-500 text-rose-500 bg-rose-50`
          : `border-cyan-500 text-cyan-500 bg-cyan-50`
      }
      `}
    >
      {!userGender ? (
        <>
          <img
            className="h-40 md:h-68 lg:h-96"
            src={require(`../assets/${gender}.png`)}
            alt="gender"
          />
          <h2 className="mt-2 sm:mt-4 text-5xl">{gender}</h2>
        </>
      ) : gender === userGender ? (
        <>
          <form className="flex flex-col items-center h-full md:text-2xl justify-evenly">
            <label htmlFor="height" className="-mb-3">
              Height
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="height"
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

            <label htmlFor="weight" className="-mb-3">
              Weight
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="weight"
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

            <label htmlFor="bodyType" className="-mb-3 ">
              Body Type
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="bodyType"
              value={user.bodyType ? user.bodyType : "Ectomorph"}
              onChange={(e) => dispatch(setBodyType(e.target.value))}
              onBlur={(e) => dispatch(setBodyType(e.target.value))}
            >
              {bodyTypes.map((bodyType) => (
                <option key={bodyType.value} value={bodyType.value}>
                  {bodyType.value}
                </option>
              ))}
            </select>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="xl:text-2xl font-semibold">LEARN YOUR BODY TYPE!</h2>
          <img
            className="md:my-3 h-1/3"
            src={require(`../assets/washing-hands-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please wrap your thumb and forefinger around your wrist in the area
            you normally wear a watch.
          </p>
          <form className="md:mt-4 text-center">
            <label htmlFor="wristSize" className="md:text-xl font-semibold">
              My fingers are;
            </label>
            <select
              className="w-full mr-5 text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="wristSize"
              value={bodyType ? bodyType : "Ectomorph"}
              onChange={(e) => {
                dispatch(setBodyType(e.target.value));
              }}
              onBlur={(e) => {
                dispatch(setBodyType(e.target.value));
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
