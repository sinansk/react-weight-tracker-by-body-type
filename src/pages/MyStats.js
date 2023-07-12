import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux/";
import UserInfoComponent from "../components/UserInfoComponent";
import UserRecordsComponent from "../components/UserRecordsComponent";
import LoadingComponent from "../components/LoadingComponent";
import StickyInfo from "../components/StickyInfo";

const MyStats = () => {
  const isLoading = useSelector((state) => state.userRecords.status);
  const userRecords = useSelector((state) => state.userRecords.records);

  // const bottomRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { top } = bottomRef.current.getBoundingClientRect();
  //     const bottomPosition = window.innerHeight - top;
  //     console.log('Bottom Position:', bottomPosition);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="items-center justify-center w-screen h-full min-h-screen overflow-x-hidden text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100 ">
      {(isLoading === "loading" || isLoading === "idle" || userRecords.length === 0) ? (
        <LoadingComponent />
      ) : (
        <>
          <Navbar />
          <StickyInfo />
          <UserInfoComponent />
          <UserRecordsComponent />
        </>
      )}
    </div>
  );
};
export default MyStats;
