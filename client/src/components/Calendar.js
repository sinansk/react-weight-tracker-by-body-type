import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDate } from '../redux/userDiary';

const Calendar = ({ className, diaryDates, onDateClick }) => {
    const dispatch = useDispatch()
    const calendarDate = useSelector((state) => state.userDiary?.calendarDate)
    const [selectedDate, setSelectedDate] = useState(calendarDate ? calendarDate : moment());
    // const [isExpanded, setIsExpanded] = useState(false);
    const isDateInDiary = (date) => {
        if (diaryDates) {
            return diaryDates.includes(date.format('DD-MM-YYYY'));
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(moment(date));
        onDateClick(date.format('DD-MM-YYYY'))
        dispatch(setCalendarDate(date))
    };

    const handleTodayClick = () => {
        setSelectedDate(moment());
        onDateClick(moment().format('DD-MM-YYYY'))
        dispatch(setCalendarDate(moment()))
    }
    const getMonthName = () => {
        return selectedDate.format('MMMM');
    };

    const getYear = () => {
        return selectedDate.format('YYYY');
    };

    const renderCalendarCell = (date) => {
        const isActive = date.isSame(selectedDate, 'day');
        const isInDiary = isDateInDiary(date);
        const isSelectedDateInDiary = isDateInDiary(selectedDate);
        const isToday = date.isSame(moment(), 'day');

        return (
            <td
                key={date.format('DD-MM-YYYY')}
                className={`cursor-pointer  hover:bg-slate-100 rounded-sm relative  ${isActive ? ' bg-pink-500 hover:bg-pink-500 text-white' : ''}`}
                onClick={() => handleDateClick(date)}
            >
                <div className={`absolute bottom-[0.5px] right-0 left-0 z-10 ${isInDiary ? ' border-b-[3px] rounded-t-md rounded-b-none border-green-500' : ''}`}></div>
                <div className={`relative ${isToday ? 'border-2  border-pink-500' : ''}`}>
                    {date.date()}

                </div>
            </td>
        );
    };

    const firstDayOfMonth = moment(selectedDate).startOf('month');
    const endOfMonth = moment(selectedDate).endOf('month');

    const daysInMonth = [];
    const currentDay = firstDayOfMonth.clone();
    while (currentDay.isBefore(endOfMonth, 'day')) {
        daysInMonth.push(currentDay.clone());
        currentDay.add(1, 'day');
    }

    const blankDays = Array.from({ length: firstDayOfMonth.weekday() }, (_, index) => (
        <td key={`blank-${index}`} className="0" />
    ));

    const daysInMonthCells = daysInMonth.map((date) => renderCalendarCell(date));

    const totalSlots = blankDays.length + daysInMonthCells.length;
    const lastBlankDays = Array.from({ length: 42 - totalSlots }, (_, index) => (
        <td key={`blank-${index + totalSlots}`} className="" />
    ));

    const allDays = [...blankDays, ...daysInMonthCells, ...lastBlankDays];


    useEffect(() => {
        console.log("selectedDate", selectedDate)
    }, [selectedDate])




    return (
        <div className={`${className} w-fit relative`}>
            <button onClick={handleTodayClick} className='absolute px-2.5 py-1 text-xs  border-2 border-pink-500 rounded-md top-2 right-2 text pink-500 hover:bg-pink-500 hover:text-white'>TODAY</button>
            <div className="flex items-center justify-between mb-4 sm:w-full sm:px-20" >
                <button onClick={() => setSelectedDate(selectedDate.clone().subtract(1, 'month'))} className="px-2 py-1 text-sm font-semibold text-gray-700">
                    {'<'}
                </button>
                <div className="text-lg font-semibold">
                    {getMonthName()} {getYear()}
                </div>
                <button onClick={() => setSelectedDate(selectedDate.clone().add(1, 'month'))} className="px-2 py-1 text-sm font-semibold text-gray-700">
                    {'>'}
                </button>
            </div>
            <table className={` mx-auto border-collapse sm:`}>
                <thead>
                    <tr>
                        <th className="px-2 py-2 sm:px-4">Sun</th>
                        <th className="px-2 py-2 sm:px-4">Mon</th>
                        <th className="px-2 py-2 sm:px-4">Tue</th>
                        <th className="px-2 py-2 sm:px-4">Wed</th>
                        <th className="px-2 py-2 sm:px-4">Thu</th>
                        <th className="px-2 py-2 sm:px-4">Fri</th>
                        <th className="px-2 py-2 sm:px-4">Sat</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {allDays.slice(rowIndex * 7, rowIndex * 7 + 7)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;