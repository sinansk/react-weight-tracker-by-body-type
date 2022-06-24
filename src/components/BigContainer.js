import { useEffect, useState } from "react";
import SmallContainer from "./SmallContainer";
import { useUser } from "../context/UserContext";
import { publicRequest } from "../requestMethods";

const BigContainer = () => {
  const { selectedGender, height, setIdealWeight, idealWeight, bodyType } =
    useUser();
  const user = useUser();
  useEffect(() => {
    console.log(idealWeight);
  }, [idealWeight]);
  console.log(user);

  // if (bodyType === "ectomorph") {
  //   setIdealWeight(idealWeight.map((item) => item - (item / 100) * 10));
  // } else if (bodyType === "Endomorph") {
  //   setIdealWeight(idealWeight.map((item) => item + (item / 100) * 10));
  // } else return;

  const makeRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.get(
        `/idealweight?gender=${selectedGender}&height=${height}`
      );
      const data = res.data.data;
      console.log(data);
      const sortedValues = Object.values(data)
        .map((item) => Math.round(item))
        .sort((a, b) => a - b);
      console.log(sortedValues);
      setIdealWeight(sortedValues);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-1 items-center sm:justify-between sm:w-1/2 sm:h3/4 mx-auto ">
        <SmallContainer gender={"female"} />
        <SmallContainer gender={"male"} />
      </div>
      {selectedGender && (
        <a
          onClick={makeRequest}
          className="my-5 rounded-sm relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-fuchsia-500 group active:bg-fuchsia-300 focus:outline-none focus:ring"
          href="/"
        >
          <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ml-4">
            CALCULATE
          </span>
        </a>
      )}
    </div>
  );
};

export default BigContainer;
