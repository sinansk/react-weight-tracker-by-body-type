import { wrist } from "../data";
import { selectGender } from "../redux/userRedux";
import { useSelector, useDispatch } from "react-redux";
import { setWristSize } from "../redux/userRedux";

const IdealMeasurementsComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const userGender = user.userGender;
  const idealMeasurements = user.idealMeasurements;
  const dispatch = useDispatch();

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
            <img
              className="my-1 h-1/3"
              src={require(`../assets/wrist-${gender}.png`)}
              alt="washing-hands"
            />
            <p className="text-sm">
              Please measure your wrist circumference with a tape measure in the
              area you normally wear a watch.
            </p>

            <label htmlFor="wristSize" className="-mb-3 ">
              Wrist Size
            </label>
            <select
              className="w-full text-center border-2 rounded-lg border-slate-400 outline-slate-500"
              id="wristSize"
              value={
                idealMeasurements.idealWristSize
                  ? idealMeasurements.idealWristSize
                  : 15
              }
              onChange={(e) => dispatch(setWristSize(e.target.value))}
              onBlur={(e) => dispatch(setWristSize(e.target.value))}
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
          <h2 className="xl:text-2xl font-semibold">
            LEARN YOUR IDEAL MEASUREMENTS!
          </h2>
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
