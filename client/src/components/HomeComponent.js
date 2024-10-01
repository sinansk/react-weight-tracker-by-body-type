import React from "react";
import { useNavigate } from "react-router-dom";
import GenderComponent from "./GetStartedComponents/GenderComponent";

const HomeComponent = ({ gender }) => {
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/idealweight", { replace: true });
  };
  return (
    <GenderComponent gender={gender} onClick={handleNavigate} />
  );
};

export default HomeComponent;
