import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux/";
import UserInfoComponent from "../components/UserInfoComponent";
import UserRecordsComponent from "../components/UserRecordsComponent";
import LoadingComponent from "../components/LoadingComponent";
import StickyInfo from "../components/StickyInfo";

const MyStats = () => {
  const isLoading = useSelector((state) => state.userRecords.status);
  const userRecords = useSelector((state) => state.userRecords.records);

  return (
    <div className="items-center justify-center w-screen h-full min-h-screen overflow-x-hidden text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100 ">
      {(isLoading === "loading" || isLoading === "idle" || userRecords.length === 0) ? (
        <LoadingComponent />
      ) : (
        <>
          <StickyInfo />
          <UserInfoComponent />
          <UserRecordsComponent />
        </>
      )}
    </div>
  );
};
export default MyStats;
