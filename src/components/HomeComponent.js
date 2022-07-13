import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectGender } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";

const HomeComponent = ({ gender }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGender = () => {
    dispatch(selectGender(gender));
    navigate("/idealweight", { replace: true });
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
      <div className="w-full h-full cursor-pointer">
        <img
          className="h-40 m-auto md:h-68 lg:h-96 xl:h-72"
          src={require(`../assets/${gender}.png`)}
          alt="gender"
        />
        <h2 className="mt-2 text-5xl sm:mt-4">{gender}</h2>
      </div>
    </div>
  );
};

export default HomeComponent;
