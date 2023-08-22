import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useDiaryEntry from '../utils/findUserDiary';
import useUserRecord from '../utils/findUserRecord';
import { BsCalendarWeek } from 'react-icons/bs';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { PiForkKnife } from 'react-icons/pi'
import { NavLink } from "react-router-dom";
import { FaWeightScale } from 'react-icons/fa6';
const StickyInfo = () => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isbottommBarVisible, setIsbottomBarVisible] = useState(true);
    // const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const calendar = useSelector((state) => state.userDiary?.calendarDate)
    const calendarDate = calendar?.format('DD-MM-YYYY') ?? moment().format('DD-MM-YYYY');
    const userRecords = useSelector((state) => state.userRecords);
    const userDiary = useSelector((state) => state.userDiary)
    const diaryEntry = useDiaryEntry(calendarDate);
    console.log(diaryEntry, "diaryEntry")
    const handleDateClick = (date) => {
        // setSelectedDate(date);
    };
    const record = useUserRecord(calendarDate);
    console.log(record, "record")
    const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);
    const handleCollapse = (e) => {

        setIsbottomBarVisible(!isbottommBarVisible)
    }

    useEffect(() => {
        console.log(isbottommBarVisible, "isbottommBarVisible")
    }, [isbottommBarVisible])

    const handleActiveClass = (isActive) => {
        if (isActive) {
            return "text-cyan-500 flex items-center shadow-[inset_0_1px_-2px_rgba(0,0,0,0.6)] justify-center bg-gray-300/10 rounded-md p-2";
        } else {
            return "text-cyan-600 group-hover:text-cyan-500 flex items-center justify-center hover:text-cyan-500 p-2";
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1, height: 'auto' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 1, height: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-0 left-0 right-0 z-40 invisible py-2 mt-10 border-t-2 rounded-t-lg bg-gradient-to-r from-teal-900 via-slate-700 to-slate-800 sm:visible text-cyan-600 border-cyan-500">
                {isbottommBarVisible ? (
                    <div className="grid items-center grid-cols-5 gap-10">

                        <div className="relative flex flex-col items-center justify-center h-full col-span-1 p-4 text-center cursor-pointer place-content-start" onMouseEnter={() => setIsCalendarVisible(true)} onMouseLeave={() => setIsCalendarVisible(false)}>

                            <div className='flex items-center justify-between gap-2 '>
                                <BsCalendarWeek size={40} className={`text-cyan-600`} />
                                <p className="text-xl font-bold group">{calendarDate}</p>
                            </div>
                            {isCalendarVisible && (
                                <div className="absolute left-0 bottom-full">
                                    <Calendar className="p-5 text-gray-200 border-2 border-b-0 rounded-lg bg-gradient-to-r from-teal-900 to-teal-900/95 backdrop:blur-lg w-fit" onDateClick={handleDateClick} diaryDates={diaryDates} />
                                </div>
                            )}
                        </div>
                        <div className='flex items-center justify-center col-span-2 gap-8'>
                            <NavLink to="/calorie-tracker" className={({ isActive }) => handleActiveClass(isActive)}>
                                <PiForkKnife size={60} />
                            </NavLink>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold">Calorie Need</p>
                                <p className="text-4xl font-bold">{record?.results?.calorieNeedByBodyGoal}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold">Calories Taken</p>
                                <p className="text-4xl font-bold">{diaryEntry?.totalNutrient.totalCalories}</p>
                            </div>
                        </div>
                        <div className='flex items-center col-span-2 gap-8'>
                            <NavLink to="/mystats" className={({ isActive }) => handleActiveClass(isActive)}>
                                <FaWeightScale size={60} />
                            </NavLink>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold">Ideal Weight</p>
                                <p className="text-4xl font-bold">{record?.results?.idealWeightRange}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold">Weight</p>
                                <p className="text-4xl font-bold">{record?.personalInfo?.weight} kg</p>
                            </div>
                        </div>
                        <button onClick={handleCollapse} className='absolute right-1 -top-2 text-cyan-600 hover:text-cyan-500'><BiSolidDownArrow size={40} /></button>
                    </div>
                ) : (
                    <button onClick={handleCollapse} className='absolute right-1 -top-8 text-cyan-600 hover:text-cyan-500'><BiSolidUpArrow size={40} /></button>
                )
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default StickyInfo;
