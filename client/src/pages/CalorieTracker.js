import React, { useState } from 'react'
import DiaryCardComponent from '../components/MembershipComponents/DiaryCardComponent'
import SearchFoodComponent from '../components/MembershipComponents/SearchFoodComponent'
import Calendar from '../components/Calendar'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TotalCalorieCard from '../components/MembershipComponents/TotalCalorieCard'

const CalorieTracker = () => {

    const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const userDiary = useSelector((state) => state.userDiary)

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const diaryDates = userDiary.calorieDiary?.map((diaryItem) => diaryItem.date);

    return (
        <div className='flex px-20 py-10 overflow-hidden justify-evenly '>
            <div className=''>
                <Calendar className="sm:w-[550px] py-5 mx-auto bg-white shadow-lg rounded-xl " diaryDates={diaryDates} onDateClick={handleDateClick} />
                <SearchFoodComponent className=" sm:w-[600px] mx-auto" selectedDate={selectedDate} />

            </div>
            <div className='flex flex-col gap-16'>
                {/* <TotalCalorieCard className="" selectedDate={selectedDate} /> */}
                {selectedDate && <DiaryCardComponent className="" selectedDate={selectedDate} />}
            </div>


        </div>
    )
}

export default CalorieTracker