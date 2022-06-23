import React from "react";
import SmallContainer from "./SmallContainer";
import { useUser } from "../context/UserContext";

const BigContainer = () => {
  const { selectedGender, setSelectedGender } = useUser();

  return (
    <div className="flex flex-col sm:flex-row sm:flex-1 items-center sm:justify-between sm:w-1/2 sm:h3/4 mx-auto ">
      <SmallContainer gender={"female"} />
      <SmallContainer gender={"male"} />
    </div>
  );
};

export default BigContainer;
