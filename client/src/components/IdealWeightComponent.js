import { heights, bodyTypes, weights } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { selectGender, setInput } from "../redux/userRedux";
import SelectInput from "./SelectInput";

const IdealWeightComponent = ({ gender }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;
  const handleGender = () => {
    !userGender && dispatch(selectGender(gender));
  };

  return (
    <div
      onClick={handleGender}
      className={`card ${gender === "female"
        ? `red-card`
        : `blue-card`
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
          <form className="flex flex-col items-center h-full md:text-2xl justify-evenly">
            <SelectInput options={heights} label="Height" name="height" />
            <SelectInput options={weights} label="Weight" name="weight" />

            <label htmlFor="bodyType" className="-mb-3 ">
              Body Type
            </label>
            <select
              disabled
              className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="bodyType"
              name="bodyType"
              value={
                user.data.personalInfo.bodyType
                  ? user.data.personalInfo.bodyType
                  : "Ectomorph"
              }
              onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))}
              onBlur={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))}
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
          <h2 className="font-semibold xl:text-2xl">LEARN YOUR BODY TYPE!</h2>
          <img
            className="md:my-3 h-1/3"
            src={require(`../assets/washing-hands-${gender}.png`)}
            alt="washing-hands"
          />
          <p className=" 2xl:text-xl">
            Please wrap your thumb and forefinger around your wrist in the area
            you normally wear a watch.
          </p>
          <form className="text-center md:mt-4 xl:mt-auto xl:mb-6 md:text-2xl">
            <SelectInput options={bodyTypes} label="My Fingers Are," name="bodyType" />
          </form>
        </span>
      )}
    </div>
  );
};

export default IdealWeightComponent;