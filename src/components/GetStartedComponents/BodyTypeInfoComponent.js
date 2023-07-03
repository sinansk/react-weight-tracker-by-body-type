import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBodyType, setBodyGoal } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { bodyTypes, bodyGoals } from "../../data";
import SelectInput from "../SelectInput";

const BodyTypeInfoComponent = ({ gender }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const bodyType = useSelector((state) => state.user.personalInfo.bodyType);
  const handleGender = () => {
    // navigate("/idealweight", { replace: true });
  };
  return (
    <div
      className={`h-72 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${gender === "female"
        ? `border-rose-500 text-rose-500 bg-rose-50`
        : `border-cyan-500 text-cyan-500 bg-cyan-50`
        }`}
    >
      {gender === "male" ? (
        <>
          <span className="flex flex-col items-center h-full">
            <h2 className="font-semibold xl:text-2xl">SET YOUR FRAME SIZE!</h2>
            <img
              className="md:my-3 h-1/3"
              src={require(`../../assets/washing-hands-${gender}.png`)}
              alt="washing-hands"
            />
            <p>
              Please wrap your thumb and forefinger around your wrist in the
              area you normally wear a watch.
            </p>
            <form className="text-center md:mt-4 lg:mt-auto">
              <SelectInput options={bodyTypes} label="My Fingers Are," name="bodyType" />
              {/* <label htmlFor="wristSize" className="font-semibold md:text-xl">
                My fingers are;
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
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
                  <option key={bodyType.status} value={bodyType.value}>
                    {bodyType.status}
                  </option>
                ))}
              </select> */}
            </form>
          </span>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR BODY GOAL</h2>
          <img
            className="md:my-4 h-1/3"
            src={require(`../../assets/goal-${gender}.png`)}
            alt="washing-hands"
          />
          <p>
            Please set your body goal and we will calculate your daily calorie
            need!
          </p>
          <form className="text-center lg:mt-auto">
            <SelectInput options={bodyGoals} label="My goal is," name="bodyGoal" />
            {/* <label htmlFor="bodyGoal" className="font-semibold md:text-xl ">
              My goal is;
            </label>
            <select
              className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
              id="bodyGoal"
              value={
                user.personalInfo.bodyGoal
                  ? user.personalInfo.bodyGoal
                  : "Maintain weight"
              }
              onChange={(e) => {
                dispatch(setBodyGoal(e.target.value));
              }}
              onBlur={(e) => {
                dispatch(setBodyGoal(e.target.value));
              }}
            >
              {bodyGoals.map((item) => (
                <option key={item.status} value={item.value}>
                  {item.status}
                </option>
              ))}
            </select> */}
          </form>
        </span>
      )}
    </div>
  );
};

export default BodyTypeInfoComponent;
