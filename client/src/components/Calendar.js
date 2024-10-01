import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDate } from '../redux/userDiary';
import { addDailyCalorie, copyDiary, deleteDiary, getCalorieRecordsForMonth, saveDiaryAsRoutine } from '../firebase';
import { fetchCalorieRecordsForMonth } from '../redux/userDiaryThunk';
import ContextMenu from './MembershipComponents/ContextMenu';
import { AiFillCheckSquare, AiFillCopy, AiFillDelete, AiFillSave } from 'react-icons/ai';
import { createModal } from '../utils/modalHooks';


const Calendar = ({ className, diaryDates, onDateClick, showContextMenu }) => {

    const dispatch = useDispatch()
    const calendarDate = useSelector((state) => state.userDiary?.calendarDate)
    const [selectedDate, setSelectedDate] = useState(calendarDate ? calendarDate : moment());
    const uid = useSelector((state) => state.user.currentUser.uid);
    // const [isExpanded, setIsExpanded] = useState(false);
    const isDateInDiary = (date) => {
        if (diaryDates) {
            return diaryDates.includes(moment(date).format('DD-MM-YYYY'));
        }
    };
    const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 });
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuDate, setContextMenuDate] = useState(null);

    const handleContextMenu = (e, date) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e, "e", date, "date", contextMenuDate, "contextMenuDate")
        // Tıklanan güne ait pozisyon bilgilerini hesaplayın
        const rect = e.currentTarget.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;
        console.log(posX, posY, "posX, posY")

        setContextMenuPos({ top: posY, left: posX });
        setContextMenuOpen(true);
    };

    const closeContextMenu = () => {
        setContextMenuOpen(false);
        contextMenuDate && setContextMenuDate(null);
    };
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)

    const handleCopyFromDate = () => {
        console.log("copy from date")
        setFromDate(calorieDiary?.find((diaryItem) => diaryItem?.date === contextMenuDate?.format("DD-MM-YYYY")) ?? null)
    }
    useEffect(() => {
        console.log(contextMenuDate, "contextMenuDate")
    }, [contextMenuDate])
    const handleCopyToDate = async () => {
        console.log(fromDate, "fromDate")

        await copyDiary({
            uid,
            selectedDate: moment(contextMenuDate).format("DD-MM-YYYY"),
            foods: fromDate?.foods,
            totalNutrient: fromDate?.totalNutrient,
        })
    }
    const handleDeleteFromDate = async () => {
        await deleteDiary({
            uid,
            selectedDate: moment(contextMenuDate).format("DD-MM-YYYY"),
        })
    }

    const handleSaveAsRoutine = async () => {
        createModal("SaveRoutineModal", {
            onSubmit: async (values) => {
                console.log(values, "values")
                await saveDiaryAsRoutine({
                    uid,
                    selectedDate: moment(contextMenuDate).format("DD-MM-YYYY"),
                    foods: calorieDiary?.find((diaryItem) => diaryItem?.date === contextMenuDate?.format("DD-MM-YYYY"))?.foods,
                    totalNutrient: calorieDiary?.find((diaryItem) => diaryItem?.date === contextMenuDate?.format("DD-MM-YYYY"))?.totalNutrient,
                    name: values.routineName
                })
            }
        })
    }

    const contextMenuButtons = [
        { label: 'Copy from date', icon: <AiFillCopy className='w-5 h-5 copy-diary' />, onClick: handleCopyFromDate, disabled: !isDateInDiary(contextMenuDate) },
        { label: 'Copy to date', icon: <AiFillCheckSquare className='w-5 h-5' />, onClick: handleCopyToDate, disabled: !fromDate },
        { label: 'Delete diary', icon: <AiFillDelete className='w-5 h-5' />, onClick: handleDeleteFromDate, disabled: !isDateInDiary(contextMenuDate) },
        { label: 'Save as routine', icon: <AiFillSave className='w-5 h-5 set-routine' />, onClick: handleSaveAsRoutine, disabled: !isDateInDiary(contextMenuDate) },
    ];

    const handleDateClick = (date) => {
        setSelectedDate(moment(date));
        onDateClick(moment(date).format('DD-MM-YYYY'))
        dispatch(setCalendarDate(date))
    };

    const handleTodayClick = () => {
        const year = moment().year();
        const month = moment().month() + 1;
        setSelectedDate(moment());
        onDateClick(moment().format('DD-MM-YYYY'))
        dispatch(setCalendarDate(moment()))
        dispatch(fetchCalorieRecordsForMonth({ year, month }))
    }
    const getMonthName = () => {
        return moment(selectedDate).format('MMMM');
    };

    const getYear = () => {
        return moment(selectedDate).format('YYYY');
    };

    const renderCalendarCell = (date) => {
        const isActive = date.isSame(selectedDate, 'day');
        const isInDiary = isDateInDiary(date);
        const isSelectedDateInDiary = isDateInDiary(selectedDate);
        const isToday = date.isSame(moment(), 'day');
        const isContextMenuDate = date.isSame(contextMenuDate, 'day');

        return (
            <td
                key={moment(date).format('DD-MM-YYYY')}
                className={`cursor-pointer  hover:bg-gray-200/30 rounded-sm relative ${isContextMenuDate && 'bg-gray-200/30'} ${isActive ? ' bg-cyan-400 hover:bg-cyan-400 text-white' : ''}`}
                onClick={() => handleDateClick(date)}
            >
                <div className={`absolute bottom-[0.5px] right-0 left-0 z-10 ${isInDiary ? ' border-b-[3px] rounded-t-md rounded-b-none border-green-500' : ''}`} ></div>
                <div className={`relative ${isToday ? 'border-2  border-teal-500' : ''}`}
                    onContextMenu={() => setContextMenuDate(date)} >
                    {date.date()}
                </div>
            </td>
        );
    };

    const firstDayOfMonth = moment(selectedDate).startOf('month');
    const endOfMonth = moment(selectedDate).endOf('month');

    const daysInMonth = [];
    const currentDay = firstDayOfMonth.clone();
    while (currentDay.isSameOrBefore(endOfMonth, 'day')) {
        daysInMonth.push(currentDay.clone());
        currentDay.add(1, 'day');
    }

    const blankDays = Array.from({ length: firstDayOfMonth.weekday() }, (_, index) => (
        <td key={`blank-${index}`} className="0" />
    ));

    const daysInMonthCells = daysInMonth.map((date) => renderCalendarCell(date));
    const totalSlots = blankDays.length + daysInMonthCells.length;
    const lastBlankDaysCount = 42 - totalSlots;
    const lastBlankDays = Array.from({ length: lastBlankDaysCount }, (_, index) => (
        <td key={`blank-${index + totalSlots}`} className="" />
    ));

    const allDays = [...blankDays, ...daysInMonthCells, ...lastBlankDays];

    const handlePrevMonthClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const prevMonth = selectedDate.clone().subtract(1, 'month');
        console.log(prevMonth, "prevMonth")
        setSelectedDate(prevMonth);
        onDateClick(moment(prevMonth).format('DD-MM-YYYY'));
        dispatch(setCalendarDate(prevMonth));

        const year = prevMonth.year();
        const month = prevMonth.month() + 1; // moment.js ay indeksi 0-11 arasında olduğu için +1 ekliyoruz
        dispatch(fetchCalorieRecordsForMonth({ year, month }))
    };

    const handleNextMonthClick = (e) => {
        console.log(e, "event")
        e.preventDefault();
        e.stopPropagation();
        const nextMonth = selectedDate.clone().add(1, 'month');
        setSelectedDate(nextMonth);
        onDateClick(moment(nextMonth).format('DD-MM-YYYY'));
        dispatch(setCalendarDate(nextMonth));

        const year = nextMonth.year();
        const month = nextMonth.month() + 1;
        dispatch(fetchCalorieRecordsForMonth({ year, month }))
    };

    return (
        <div className={`${className} w-fit relative`} onContextMenu={(e) => handleContextMenu(e)}>
            <button onClick={handleTodayClick} className='absolute top-0 right-0 px-2.5 py-1 text-xs border-2 border-teal-500 rounded-lg sm:top-2 sm:right-2 text pink-500 hover:bg-teal-500 hover:text-white'>TODAY</button>
            <div className="flex items-center justify-between mt-2 mb-4 sm:mt0 sm:w-full sm:px-20" >
                <button onClick={(e) => handlePrevMonthClick(e)} className="px-2 py-1 text-sm font-semibold ">
                    {'<'}
                </button>
                <div className="text-lg font-semibold">
                    {getMonthName()} {getYear()}
                </div>
                <button onClick={(e) => handleNextMonthClick(e)} className="px-2 py-1 text-sm font-semibold ">
                    {'>'}
                </button>
            </div>
            <table className={` mx-auto border-collapse sm:`} >
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
                <tbody className='' >
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                        <tr key={rowIndex} >
                            {allDays.slice(rowIndex * 7, rowIndex * 7 + 7)}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showContextMenu &&
                <ContextMenu isOpen={contextMenuOpen} x={contextMenuPos.left} y={contextMenuPos.top} buttons={contextMenuButtons} contextMenuDate={contextMenuDate && moment(contextMenuDate).format("DD-MM-YYYY")} onDeleteFromDate={handleDeleteFromDate} onCopyToDate={handleCopyToDate} onCopyFromDate={handleCopyFromDate} onClose={closeContextMenu} />
            }
        </div>
    );
};

export default Calendar;