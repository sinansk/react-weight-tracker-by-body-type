import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux/";
import UserInfoComponent from "../components/UserInfoComponent";
import UserRecordsComponent from "../components/UserRecordsComponent";
import { getUserInfo } from "../firebase";

const MyStats = () => {
  const isFetching = useSelector((state) => state.userRecords.isFetching);



  return (

    <div className="items-center justify-center w-screen overflow-x-hidden text-center h-fit bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100 ">
      <Navbar />
      <UserInfoComponent />
      <UserRecordsComponent />
    </div>
  );
};

export default MyStats;
