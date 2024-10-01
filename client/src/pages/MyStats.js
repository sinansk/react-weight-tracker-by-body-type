import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux/";
import LoadingComponent from "../components/CommonComponents/Loaders/LoadingComponent";
import UserInfoComponent from "../components/MembershipComponents/UserInfoComponent";
import UserRecordsComponent from "../components/MembershipComponents/UserRecordsComponent";
import StickyInfo from "../components/StickyInfo";

const MyStats = () => {
  const isLoading = useSelector((state) => state.userRecords.status);
  const userRecords = useSelector((state) => state.userRecords);

  return (
    <div className="items-center justify-center w-screen h-full min-h-screen overflow-x-hidden text-center ">
      <div className="sm:mb-20">
        <UserInfoComponent />
        <UserRecordsComponent />
      </div>
      <StickyInfo />
    </div>
  );
};
export default MyStats;
