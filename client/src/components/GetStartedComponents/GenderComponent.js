import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGender } from "../../redux/userRedux";

const GenderComponent = ({ className, gender, onClick }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleGender = () => {
    dispatch(selectGender(gender));
    onClick()
  };

  return (
    <div
      onClick={handleGender}
      className={`${className} card cursor-pointer ${gender === "female"
        ? `card-primary`
        : `card-secondary`
        } ${user.data?.personalInfo?.gender === gender
          ? `outline outline-3  outline-offset-2 outline-teal-500`
          : ""} `}
    >
      <>
        <img
          className="h-32 md:h-68 lg:h-96 2xl:h-72"
          src={require(`../../assets/${gender}.png`)}
          alt="gender"
        />
        <h2 className="mt-2 text-3xl xl:text-5xl sm:mt-4">{gender}</h2>
      </>
    </div>
  );
};

export default GenderComponent;
