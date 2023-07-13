import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGender } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";


const HomeComponent = ({ gender }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleGender = () => {
    dispatch(selectGender(gender));
    navigate("/idealweight", { replace: true });
  };

  return (

    <div
      onClick={handleGender}
      className={`card ${gender === "female"
        ? `red-card`
        : `blue-card`
        } ${user.data.personalInfo.gender && user.data.personalInfo.gender === gender
          ? `outline outline-3  outline-offset-2 outline-green-500`
          : ""} `}
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
