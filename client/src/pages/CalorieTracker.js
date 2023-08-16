import React, { useState } from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'
import Calendar from '../components/Calendar'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TotalCalorieCard from '../components/MembershipComponents/TotalCalorieCard'
import StickyInfo from '../components/StickyInfo'

const CalorieTracker = () => {

    // const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const userDiary = useSelector((state) => state.userDiary)
    const calendar = useSelector((state) => state.userDiary?.calendarDate)
    const calendarDate = calendar ? calendar?.format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    const handleDateClick = (date) => {
        setCalendarExpand(!calendarExpand)
        // setSelectedDate(date);
    };

    const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);
    const [calendarExpand, setCalendarExpand] = useState(false)


    return (
        <div className='flex flex-col py-10 sm:overflow-hidden sm:px-20 '>
            <div className=''>
                {calendarDate && <DiaryCardComponent className={`${calendarExpand && `hidden`} max-w-full`} selectedDate={calendarDate} calendarExpand={calendarExpand} setCalendarExpand={setCalendarExpand} />}
                <Calendar className={`${!calendarExpand && `hidden`} sm:w-[550px] w-full max-w-fit py-5 mx-auto bg-white shadow-lg rounded-xl `} diaryDates={diaryDates} onDateClick={handleDateClick} />
                <SearchFoodComponent className=" sm:w-[600px] mx-auto max-w-full" selectedDate={calendarDate} />
                <StickyInfo />
            </div>
            <div className='flex flex-col gap-16'>
                {/* <TotalCalorieCard className="" selectedDate={selectedDate} /> */}
                {/* {selectedDate && <DiaryCardComponent className={`${calendarExpand && `hidden`} max-w-full`} selectedDate={selectedDate} calendarExpand={calendarExpand} setCalendarExpand={setCalendarExpand} />} */}
            </div>


        </div>
    )
}

export default CalorieTracker