import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Calendar = ({ className, diaryDates, onDateClick }) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [isExpanded, setIsExpanded] = useState(false);
    const isDateInDiary = (date) => {
        return diaryDates.includes(date.format('DD-MM-YYYY'));
    };

    const handleDateClick = (date) => {
        setSelectedDate(moment(date));
        onDateClick(date.format('DD-MM-YYYY'));
    };

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

    const handleCollapse = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        console.log("isExpanded", isExpanded)
    }, [isExpanded])
    return (
        <div className={`${className} `}>
            <div className="flex items-center justify-between mb-4 sm:w-full sm:px-20" onClick={handleCollapse}>
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
            <table className={`${!isExpanded && `hidden sm:block`} mx-auto border-collapse sm:`}>
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