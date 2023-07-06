import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGender } from "../../redux/userRedux";

const GenderComponent = ({ gender }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleGender = () => {
    dispatch(selectGender(gender));
  };

  return (
    <div
      onClick={handleGender}
      className={`cursor-pointer h-60 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${gender === "female"
        ? `border-rose-500 text-rose-500 bg-rose-50`
        : `border-cyan-500 text-cyan-500 bg-cyan-50`
        } ${user.data.personalInfo.gender && user.data.personalInfo.gender === gender
          ? `outline outline-3  outline-offset-2 outline-green-500`
          : ""
        }
          `}
    >
      <>
        <img
          className="h-40 md:h-68 lg:h-96 2xl:h-72"
          src={require(`../../assets/${gender}.png`)}
          alt="gender"
        />
        <h2 className="mt-2 text-5xl sm:mt-4">{gender}</h2>
      </>
    </div>
  );
};

export default GenderComponent;
