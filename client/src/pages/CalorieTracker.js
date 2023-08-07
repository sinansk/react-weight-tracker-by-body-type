import React, { useState } from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'
import Calendar from '../components/Calendar'
import { useSelector } from 'react-redux'
import moment from 'moment'

const CalorieTracker = () => {

    const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const userDiary = useSelector((state) => state.userDiary)

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);

    return (
        <div className='grid grid-cols-2 px-20 py-10 overflow-hidden'>
            <div className="">
                <Calendar className="sm:w-[550px] mx-auto bg-white shadow-lg rounded-xl py-5" diaryDates={diaryDates} onDateClick={handleDateClick} />
                <SearchFoodComponent className="sm:w-[600px] mx-auto sticky top-[300px]" selectedDate={selectedDate} />
            </div>
            <div className='flex-col'>
                {selectedDate && <DiaryCardComponent className="ml-auto" selectedDate={selectedDate} />}
            </div>
        </div>
    )
}

export default CalorieTracker