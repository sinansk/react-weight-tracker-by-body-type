import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux/";
import UserInfoComponent from "../components/UserInfoComponent";
import UserRecordsComponent from "../components/UserRecordsComponent";
import LoadingComponent from "../components/LoadingComponent";

const MyStats = () => {
  const isLoading = useSelector((state) => state.userRecords.status);
  const userRecords = useSelector((state) => state.userRecords.records);

  return (
    <div className="items-center justify-center w-screen overflow-x-hidden text-center h-full min-h-screen bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100 ">
      {(isLoading === "loading" || isLoading === "idle" || userRecords.length === 0) ? (
        <LoadingComponent />
      ) : (
        <>
          <Navbar />
          <UserInfoComponent />
          <UserRecordsComponent />
        </>
      )}
    </div>
  );
};
export default MyStats;
