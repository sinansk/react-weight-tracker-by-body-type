import React, { useState } from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'
import Calendar from '../components/Calendar'
import { useSelector } from 'react-redux'
import moment from 'moment'

const CalorieTracker = () => {

    const [selectedDate, setSelectedDate] = useState();
    const userDiary = useSelector((state) => state.userDiary)
    const diary = userDiary.calorieDiary

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const diaryDates = userDiary.calorieDiary.map((diaryItem) => diaryItem.date);
    console.log(diaryDates, "diaryDates")
    return (
        <div className='flex'>
            <SearchFoodComponent className="sm:w-[600px] mx-auto" />
            <Calendar className="my-10" diaryDates={userDiary.calorieDiary.map(entry => entry.date)} onDateClick={handleDateClick} />
            {selectedDate && <DiaryCardComponent className="my-10" selectedDate={selectedDate} />}
        </div>
    )
}

export default CalorieTracker