import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useDiaryEntry from "../utils/findUserDiary";
import useUserRecord from "../utils/findUserRecord";
import { BsCalendarWeek } from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { PiForkKnife } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaWeightScale } from "react-icons/fa6";
import { setCalendarDate } from "../redux/userDiary";
const StickyInfo = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isbottommBarVisible, setIsbottomBarVisible] = useState(true);
  // const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
  const calendar = useSelector((state) => state.userDiary?.calendarDate);
  const calendarDate = calendar
    ? moment(calendar).format("DD-MM-YYYY")
    : moment().format("DD-MM-YYYY");
  const userRecords = useSelector((state) => state.userRecords);
  const userDiary = useSelector((state) => state.userDiary);
  const diaryEntry = useDiaryEntry(calendarDate);
  const dispatch = useDispatch();

  const handleDateClick = (date) => {
    // setSelectedDate(date);
    dispatch(setCalendarDate(date));
  };
  const record = useUserRecord(calendarDate);

  const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);
  const handleCollapse = (e) => {
    setIsbottomBarVisible(!isbottommBarVisible);
  };

  const handleActiveClass = (isActive) => {
    if (isActive) {
      return "text-teal-400 flex items-center shadow-[inset_0_1px_-2px_rgba(0,0,0,0.6)] justify-center bg-gray-300/10 rounded-md p-2";
    } else {
      return "text-teal-500 group-hover:text-cyan-400 flex items-center justify-center hover:text-teal-400 p-2";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, height: "auto" }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 1, height: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-0 left-0 right-0 z-40 invisible py-2 text-gray-300 border-t-2 border-gray-300 rounded-t-lg mt-30 bg-gradient-to-r from-teal-900 via-slate-700 to-slate-800 sm:visible"
      >
        {isbottommBarVisible ? (
          <div className="grid items-center grid-cols-5 gap-10">
            <div
              className="relative flex flex-col items-center justify-center h-full col-span-1 p-4 text-center cursor-pointer calendar place-content-start"
              onMouseEnter={() => setIsCalendarVisible(true)}
              onMouseLeave={() => setIsCalendarVisible(false)}
              onClick={() => setIsCalendarVisible(true)}
            >
              <div className="flex items-center justify-between gap-2 ">
                <BsCalendarWeek size={40} className={`text-teal-500`} />
                <p className="text-xl font-bold group">{calendarDate}</p>
              </div>
              {isCalendarVisible && (
                <div className="absolute left-0 z-30 bottom-full calendar">
                  <Calendar
                    showContextMenu={true}
                    className="p-5 text-gray-200 border-2 border-b-0 rounded-lg bg-gradient-to-r from-teal-900 to-teal-900/95 backdrop:blur-lg w-fit"
                    onDateClick={handleDateClick}
                    diaryDates={diaryDates}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center col-span-2 gap-8">
              <NavLink
                to="/calorie-tracker"
                className={({ isActive }) => handleActiveClass(isActive)}
              >
                <PiForkKnife size={60} />
              </NavLink>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Calorie Need</p>
                <p className="text-4xl font-bold">
                  {record?.results?.calorieNeedByBodyGoal}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Calories Taken</p>
                <p className="text-4xl font-bold">
                  {diaryEntry?.totalNutrient.totalCalories ?? "0kcal"}
                </p>
              </div>
            </div>
            <div className="flex items-center col-span-2 gap-8">
              <NavLink
                to="/mystats"
                className={({ isActive }) => handleActiveClass(isActive)}
              >
                <FaWeightScale size={60} />
              </NavLink>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Ideal Weight</p>
                <p className="text-4xl font-bold">
                  {record?.results?.idealWeightRange}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Weight</p>
                <p className="text-4xl font-bold">
                  {record?.personalInfo?.weight} kg
                </p>
              </div>
            </div>
            <button
              onClick={handleCollapse}
              className="absolute text-teal-500 right-1 -top-2 hover:text-teal-400"
            >
              <BiSolidDownArrow size={40} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleCollapse}
            className="absolute text-teal-500 right-1 -top-8 hover:text-teal-400"
          >
            <BiSolidUpArrow size={40} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyInfo;
