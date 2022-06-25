import React from "react";
import BigContainer from "../components/BigContainer";
import Navbar from "../components/Navbar";
import ResultComponent from "../components/ResultComponent";

const DailiyCalorie = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <BigContainer />
      {/* <Footer /> */}
      <ResultComponent />
    </div>
  );
};

export default DailiyCalorie;
